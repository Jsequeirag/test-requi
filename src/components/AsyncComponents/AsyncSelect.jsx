import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import formStore from "../../../stores/FormStore.js";
import { X, ChevronDown, Loader2 } from "lucide-react";

export default function AsyncSelect({
  url = "",
  name = "",
  required = true,
  customNameParam = "",
  disabled = false,
  value: propValue = "",
  valueName = "",
  customIdParam = "",
}) {
  const setFormValues = formStore((state) => state.setFormValues);
  const formValues = formStore((state) => state.formValues);

  const [selectedValue, setSelectedValue] = useState(propValue);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Hook para obtener los datos de la API - SIN initialData
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
    enabled: !!url, // Solo ejecutar si hay URL
    // Removido initialData: [] para permitir que isLoading funcione correctamente
  });

  // Variable para determinar si está cargando (inicial o refetch)
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
        setSearchText(
          selectedItem
            ? customNameParam
              ? selectedItem[customNameParam]
              : selectedItem.name
            : ""
        );
      }
    }
  }, [propValue, selectedValue, data, isSuccess, customNameParam]);

  // Efecto para inicializar searchText cuando los datos se cargan o propValue cambia
  useEffect(() => {
    if (isSuccess && data && propValue) {
      let selectedItem;
      if (customIdParam) {
        selectedItem = data.find(
          (item) => String(item[customIdParam]) === String(propValue)
        );
      } else {
        selectedItem = data.find(
          (item) => String(item.id) === String(propValue)
        );
      }
      setFormValues({ [name]: selectedItem.id || selectedItem[customIdParam] });
      if (selectedItem) {
        setSearchText(
          customNameParam ? selectedItem[customNameParam] : selectedItem.name
        );
      }
    } else if (!propValue) {
      setSearchText("");
    }
  }, [isSuccess, data, propValue, customNameParam]);

  // Manejar clics fuera del componente para cerrar la lista
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Función para filtrar las opciones basadas en el searchText
  const filteredData = data.filter((item) => {
    const itemText = customNameParam ? item[customNameParam] : item.name;
    return itemText.toLowerCase().includes(searchText.toLowerCase());
  });

  // Manejar la selección de una opción de la lista
  const handleOptionClick = (item) => {
    setSelectedValue(item.id || item[customIdParam]);
    setSearchText(customNameParam ? item[customNameParam] : item.name);
    setFormValues({ [name]: item.id || item[customIdParam] });
    setIsOpen(false);
  };

  // Manejar el cambio en el input de búsqueda
  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    setIsOpen(true);

    const currentSelectedItemText = data.find(
      (item) => String(item.id) === String(selectedValue)
    );
    if (currentSelectedItemText) {
      const selectedText = customNameParam
        ? currentSelectedItemText[customNameParam]
        : currentSelectedItemText.name;
      if (selectedText.toLowerCase() !== e.target.value.toLowerCase()) {
        setSelectedValue("");
        setFormValues({ [name]: "" });
      }
    } else if (e.target.value === "") {
      setSelectedValue("");
      setFormValues({ [name]: "" });
    }
  };

  // Manejar el borrado del input
  const handleClearInput = () => {
    setSelectedValue("");
    setSearchText("");
    setFormValues({ [name]: "" });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          className="shadow border rounded-md w-full py-2 px-3 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          placeholder={
            isLoadingData
              ? "Cargando..."
              : disabled
              ? "No Disponible"
              : "Buscar o seleccionar una opción"
          }
          value={searchText}
          onChange={handleSearchInputChange}
          onFocus={() => setIsOpen(true)}
          disabled={disabled || isLoadingData}
          required={required}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        {isLoadingData && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-8 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        {searchText && !disabled && !isLoadingData && (
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Limpiar selección"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {!isLoadingData && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={isOpen ? "Cerrar opciones" : "Abrir opciones"}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        )}
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
          ) : isSuccess && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li
                key={item.id}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                  String(selectedValue) === String(item.id)
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-900"
                }`}
                onClick={() => handleOptionClick(item)}
                role="option"
                aria-selected={String(selectedValue) === String(item.id)}
              >
                {customNameParam ? item[customNameParam] : item.name}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">
              No se encontraron resultados
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
