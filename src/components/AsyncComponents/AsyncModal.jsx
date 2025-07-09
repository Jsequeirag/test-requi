import React, { useState } from "react";
import { createPortal } from "react-dom"; // Importa createPortal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark, // Icono para cerrar/cancelar
  faCheck, // Icono para confirmar
} from "@fortawesome/free-solid-svg-icons"; // Importamos los iconos necesarios
import { useApiSend } from "../../api/config/customHooks";
export default function AsyncModal({
  openModal = false,
  setOpenModal,
  message, // Mensaje personalizable
  pcWidth = "28rem", // Cambiado a rem para un control de tamaño más consistente
  movilWidth = "90%",
  request,
  data, // Ancho en móviles más estándar
}) {
  const { isPending, mutateAsync } = useApiSend(request);
  const handleConfirm = async () => {
    console.log(request);
    console.log(data);
    /* mutateAsync(data)
      .then(async (res) => {
        console.log(res);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
        setOpenModal(false);
      });*/
    // Cierra el modal después de confirmar
  };

  // Si el modal no está abierto, no renderizamos nada
  if (!openModal) {
    return null;
  }

  // --- Contenido del modal que será renderizado por el Portal ---
  const modalContent = (
    // Overlay del modal: fondo semitransparente oscuro y efecto de desenfoque
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        openModal ? "opacity-100" : "opacity-0 pointer-events-none" // Control de opacidad y eventos para animación
      }`}
      onClick={() => setOpenModal(false)} // Cierra al hacer clic fuera del modal
    >
      {/* Contenido del modal: tarjeta flotante */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 relative flex flex-col transform transition-all duration-300 scale-100 opacity-100 border border-gray-200 dark:border-gray-700`}
        // Evita que el clic en el contenido cierre el modal
        onClick={(e) => e.stopPropagation()}
        style={{
          width: window.innerWidth > 768 ? pcWidth : movilWidth, // Usa media query para aplicar anchos
          maxWidth: "90%", // Asegura que no sea demasiado ancho en pantallas grandes
          maxHeight: "90vh", // Limita la altura para pantallas pequeñas
        }}
      >
        {/* Botón de cerrar tipo iOS/macOS (más discreto) */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Cerrar modal"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />{" "}
          {/* Icono de "x" más limpio */}
        </button>

        <div className="flex-grow flex flex-col justify-center items-center text-center px-4 py-6">
          {/* Mensaje personalizable con estilo más prominente */}
          <p className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed dark:text-gray-100">
            {message}
          </p>
        </div>

        {/* Controles de acción: botones con estilo "iOS" */}
        <div className="flex justify-center gap-4 mt-4">
          {/* Botón Cancelar - Diseño iOS/macOS */}
          <button
            onClick={() => setOpenModal(false)}
            className="flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base shadow-sm 
                       bg-gray-200 text-gray-700 
                       hover:bg-gray-300 hover:shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 
                       active:scale-[0.98] active:bg-gray-400 active:shadow-inner
                       transition-all duration-200
                       dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:active:bg-gray-500"
          >
            <FontAwesomeIcon icon={faXmark} className="mr-2 text-base" />{" "}
            {/* Icono de "x" para cancelar */}
            <span>Cancelar</span>
          </button>

          {/* Botón Confirmar - Diseño iOS/macOS */}
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base shadow-sm 
                       bg-blue-500 text-white 
                       hover:bg-blue-600 hover:shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 
                       active:scale-[0.98] active:bg-blue-700 active:shadow-inner
                       transition-all duration-200"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />{" "}
            {/* Icono de check para confirmar */}
            <span>{isPending ? "Guardando" : "Confirmar"}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // --- Renderiza el modal usando un Portal ---
  return createPortal(
    modalContent,
    document.getElementById("modal-root") || document.body // Si 'modal-root' no existe, usar document.body como fallback
  );
}
