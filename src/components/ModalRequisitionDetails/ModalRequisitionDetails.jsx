import React, { useState, useEffect } from "react"; // Importar useState y useEffect
import { IconButton, TextButton } from "../../components/Button/Button";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import RDetailMovimientoLateral from "../../pages/NewRequisition/RequisitionDetail/RDetailMovimientoLateral"; // No es necesario importar aquí si solo se usa como children
import { getLocalStorageItem } from "../../utils/localstore"; // Para el modo oscuro

export default function ModalRequisitionDetails({
  openModal = false,
  setOpenModal,
  childrenComponent,
}) {
  // Estado local para el modo oscuro, sincronizado con localStorage
  const [darkMode, setDarkMode] = useState(true);

  /*useEffect(() => {
    const storedDarkMode = getLocalStorageItem("requi-darkMode");
    if (storedDarkMode === "true") {
      setDarkMode(true);
    }
  }, []);*/

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center // Clases para el overlay: ocupa toda la pantalla, centrado
        transition-opacity duration-300 // Transición suave para la opacidad
        ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible"
        } // Control de visibilidad
        ${"bg-gray-900/75"} // Fondo semitransparente para modo oscuro/claro
        backdrop-blur-sm // Efecto de desenfoque en el fondo
      `}
      style={{ display: openModal ? "flex" : "none" }} // Usar 'flex' para el centrado
      role="dialog" // Rol para accesibilidad
      aria-modal="true" // Indica que es un modal
      aria-labelledby="modal-title" // Enlaza con el título del modal (si lo tiene childrenComponent)
    >
      <div
        className={`modal-content pc:w-[50%] movil:w-[60%] mt-[15%] m-auto pt-1 pr-1 border rounded-sm
          ${"bg-slate-50 text-gray-900"} // Fondo y texto para modo oscuro/claro
        `}
      >
        <div className="flex justify-end items-end">
          <div className="text-center ">
            <IconButton
              bgColor={`bg-red-500`}
              hoverBgColor={`hover:bg-red-500 `}
              hoverTextColor={`hover:text-black`}
              otherProperties="w-auto "
              icon={faCircleXmark}
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
        <div className="w-full p-2" key={openModal ? Date.now() : "closed"}>
          {childrenComponent}
        </div>
      </div>
    </div>
  );
}
