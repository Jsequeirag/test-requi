import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, X, Check } from "lucide-react"; // ← lucide-react
import { useApiSend } from "../../api/config/customHooks";

export default function AsyncModal({
  openModal = false,
  setOpenModal,
  message,
  pcWidth = "28rem",
  movilWidth = "90%",
  request,
  data,
}) {
  const { isPending, mutateAsync } = useApiSend(request);

  const handleConfirm = async () => {
    try {
      await mutateAsync(data);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      // No cerramos el modal en error → usuario puede reintentar
    }
  };

  if (!openModal) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        openModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 relative flex flex-col border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: window.innerWidth > 768 ? pcWidth : movilWidth,
          maxWidth: "90%",
          maxHeight: "90vh",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setOpenModal(false)}
          disabled={isPending}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 disabled:opacity-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mensaje */}
        <div className="flex-grow flex flex-col justify-center items-center text-center px-4 py-6">
          <p className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed dark:text-gray-100">
            {message}
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 mt-4">
          {/* Cancelar */}
          <button
            onClick={() => setOpenModal(false)}
            disabled={isPending}
            className="flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base shadow-sm 
                       bg-gray-200 text-gray-700 
                       hover:bg-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-gray-300 
                       active:scale-[0.98]
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>

          {/* Confirmar con loading */}
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base shadow-sm 
                       bg-blue-500 text-white 
                       hover:bg-blue-600 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       active:scale-[0.98]
                       transition-all duration-200
                       disabled:opacity-70 disabled:cursor-not-allowed
                       flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Confirmar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById("modal-root") || document.body
  );
}
