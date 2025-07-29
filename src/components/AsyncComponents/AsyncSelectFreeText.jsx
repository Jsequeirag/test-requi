import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import formStore from "../../../stores/FormStore.js";
import { X, ChevronDown, Loader2, Edit3, Check } from "lucide-react";

export default function AsyncSelect({
  url = "",
  name = "",
  required = true,
  customNameParam = "",
  disabled = false,
  value: propValue = "",
  valueName = "",
  customIdParam = "",
  allowFreeText = true, // Nueva prop para habilitar/deshabilitar texto libre
  onFreeTextChange = null, // Callback cuando se usa texto libre
}) {
  const setFormValues = formStore((state) => state.setFormValues);
  const formValues = formStore((state) => state.formValues);

  const [selectedValue, setSelectedValue] = useState(propValue);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFreeText, setIsFreeText] = useState(false); // Indica si el valor actual es texto libre
  const [hasUserTyped, setHasUserTyped] = useState(false); // Indica si el usuario ha escrito algo
  const wrapperRef = useRef(null);

  // Hook para obtener los datos de la API
  const {
    data = [],
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: [name, url],
    queryFn: async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(
            `HTTP error! status: ${response.status} for URL: ${url}`
          );
          return [];
        }
        const result = await response.json();
        if (Array.isArray(result)) {
          return result;
        } else {
          console.warn(
            `La respuesta de la API para ${url} no es un array:`,
            result
          );
          return [];
        }
      } catch (error) {
        console.error(`Error al obtener datos para ${url}:`, error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!url,
  });

  const isLoadingData = isLoading || isFetching;

  // Efecto para sincronizar el estado interno 'selectedValue' con la prop 'propValue'
  useEffect(() => {
    if (
      propValue !== undefined &&
      String(propValue) !== String(selectedValue)
    ) {
      setSelectedValue(propValue);
      if (data && isSuccess) {
        const selectedItem = data.find(
          (item) => String(item.id) === String(propValue)
        );
        if (selectedItem) {
          setSearchText(
            customNameParam ? selectedItem[customNameParam] : selectedItem.name
          );
          setIsFreeText(false);
        } else if (propValue) {
          // Si propValue no se encuentra en los datos, asumimos que es texto libre
          setSearchText(String(propValue));
          setIsFreeText(true);
        }
      }
    }
  }, [propValue, selectedValue, data, isSuccess, customNameParam]);

  // Efecto para inicializar searchText cuando los datos se cargan o propValue cambia
  useEffect(() => {
    if (isSuccess && data && propValue) {
      const selectedItem = data.find(
        (item) => String(item.id) === String(propValue)
      );
      if (selectedItem) {
        setSearchText(
          customNameParam ? selectedItem[customNameParam] : selectedItem.name
        );
        setIsFreeText(false);
      } else if (allowFreeText) {
        // Si no se encuentra en los datos y se permite texto libre
        setSearchText(String(propValue));
        setIsFreeText(true);
      }
    } else if (!propValue) {
      setSearchText("");
      setIsFreeText(false);
    }
  }, [isSuccess, data, propValue, customNameParam, allowFreeText]);

  // Manejar clics fuera del componente para cerrar la lista
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        // Si hay texto y se permite texto libre, confirmar como texto libre
        if (searchText && allowFreeText && hasUserTyped) {
          handleFreeTextConfirm();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchText, allowFreeText, hasUserTyped]);

  // Función para filtrar las opciones basadas en el searchText
  const filteredData = data.filter((item) => {
    const itemText = customNameParam ? item[customNameParam] : item.name;
    return itemText.toLowerCase().includes(searchText.toLowerCase());
  });

  // Función para confirmar texto libre
  const handleFreeTextConfirm = () => {
    if (searchText && allowFreeText) {
      setIsFreeText(true);
      setSelectedValue(searchText);
      setFormValues({ [name]: searchText });
      setIsOpen(false);
      setHasUserTyped(false);

      // Llamar callback si existe
      if (onFreeTextChange) {
        onFreeTextChange(searchText);
      }
    }
  };

  // Manejar la selección de una opción de la lista
  const handleOptionClick = (item) => {
    const itemId = item.id || item[customIdParam];
    const itemText = customNameParam ? item[customNameParam] : item.name;

    setSelectedValue(itemId);
    setSearchText(itemText);
    setFormValues({ [name]: itemId });
    setIsOpen(false);
    setIsFreeText(false);
    setHasUserTyped(false);
  };

  // Manejar el cambio en el input de búsqueda
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setIsOpen(true);
    setHasUserTyped(true);

    // Si el texto no coincide exactamente con una opción seleccionada, limpiar selección
    const currentSelectedItem = data.find(
      (item) => String(item.id) === String(selectedValue)
    );

    if (currentSelectedItem) {
      const selectedText = customNameParam
        ? currentSelectedItem[customNameParam]
        : currentSelectedItem.name;
      if (selectedText.toLowerCase() !== value.toLowerCase()) {
        setSelectedValue("");
        setIsFreeText(false);
        if (!allowFreeText) {
          setFormValues({ [name]: "" });
        }
      }
    }

    // Si el campo está vacío, limpiar todo
    if (value === "") {
      setSelectedValue("");
      setFormValues({ [name]: "" });
      setIsFreeText(false);
    }
  };

  // Manejar el borrado del input
  const handleClearInput = () => {
    setSelectedValue("");
    setSearchText("");
    setFormValues({ [name]: "" });
    setIsOpen(false);
    setIsFreeText(false);
    setHasUserTyped(false);
  };

  // Manejar Enter para confirmar texto libre
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText && allowFreeText && hasUserTyped) {
      e.preventDefault();
      handleFreeTextConfirm();
    }
  };

  // Determinar si mostrar opciones de texto libre
  const showFreeTextOption =
    allowFreeText &&
    searchText &&
    hasUserTyped &&
    !filteredData.some((item) => {
      const itemText = customNameParam ? item[customNameParam] : item.name;
      return itemText.toLowerCase() === searchText.toLowerCase();
    });

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
            isFreeText ? "border-orange-300 bg-orange-50" : ""
          }`}
          placeholder={
            isLoadingData
              ? "Cargando..."
              : disabled
              ? "No Disponible"
              : allowFreeText
              ? "Buscar, seleccionar o escribir texto libre"
              : "Buscar o seleccionar una opción"
          }
          value={searchText}
          onChange={handleSearchInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoadingData}
          required={required}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />

        {/* Indicador de estado */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {isLoadingData && (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500 mr-6" />
          )}

          {isFreeText && !isLoadingData && (
            <div className="mr-6" title="Texto libre">
              <Edit3 className="h-4 w-4 text-orange-500" />
            </div>
          )}

          {!isFreeText && selectedValue && !isLoadingData && (
            <div className="mr-6" title="Seleccionado de la lista">
              <Check className="h-4 w-4 text-green-500" />
            </div>
          )}

          {searchText && !disabled && !isLoadingData && (
            <button
              type="button"
              onClick={handleClearInput}
              className="text-gray-500 hover:text-gray-700 focus:outline-none mr-1"
              aria-label="Limpiar selección"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {!isLoadingData && (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={isOpen ? "Cerrar opciones" : "Abrir opciones"}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <ul
          className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto"
          role="listbox"
        >
          {isLoadingData ? (
            <li className="px-3 py-2 text-gray-500 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando opciones...
            </li>
          ) : (
            <>
              {/* Opción de texto libre */}
              {showFreeTextOption && (
                <li
                  className="px-3 py-2 cursor-pointer hover:bg-orange-100 bg-orange-50 text-orange-700 border-b border-orange-200 flex items-center gap-2"
                  onClick={handleFreeTextConfirm}
                  role="option"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>
                    Usar texto libre: "<strong>{searchText}</strong>"
                  </span>
                </li>
              )}

              {/* Opciones de la API */}
              {isSuccess && filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <li
                    key={item.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-100 flex items-center gap-2 ${
                      String(selectedValue) === String(item.id) && !isFreeText
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-900"
                    }`}
                    onClick={() => handleOptionClick(item)}
                    role="option"
                    aria-selected={
                      String(selectedValue) === String(item.id) && !isFreeText
                    }
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    {customNameParam ? item[customNameParam] : item.name}
                  </li>
                ))
              ) : !showFreeTextOption ? (
                <li className="px-3 py-2 text-gray-500">
                  No se encontraron resultados
                  {allowFreeText && (
                    <div className="text-xs text-gray-400 mt-1">
                      Presiona Enter para usar texto libre
                    </div>
                  )}
                </li>
              ) : null}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
