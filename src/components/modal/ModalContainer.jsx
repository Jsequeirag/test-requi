import React, { useEffect } from "react";
import { X } from "lucide-react";

const ModalContainer = ({
  isOpen,
  onClose,
  children,
  title,
  width = "28rem",
  maxWidth = "90%",
  className = "",
  showCloseButton = true,
  preventCloseOnOverlayClick = false,
}) => {
  // Manejo del scroll de la página de fondo
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) {
    return null;
  }

  return (
    // Overlay del modal: fondo semitransparente oscuro y efecto de desenfoque
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={!preventCloseOnOverlayClick ? onClose : undefined}
    >
      {/* Contenido del modal: tarjeta flotante */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl relative flex flex-col transform transition-all duration-300 scale-100 opacity-100 border border-gray-200 dark:border-gray-700 ${className}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: window.innerWidth > 768 ? width : width,
          maxWidth,
          maxHeight: "90vh",
        }}
      >
        {/* Header con título y botón de cerrar */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Contenido del modal */}
        <div className="flex-grow overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalContainer;
