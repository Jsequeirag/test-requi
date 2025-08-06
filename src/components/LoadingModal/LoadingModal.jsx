import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// Si usas getLocalStorageItem para temas, mantén la importación
// import { getLocalStorageItem } from "../../utils/localstore";

export default function LoadingModal({ openModal, text = "Cargando..." }) {
  // Puedes re-integrar la lógica de darkMode aquí si es necesaria para el tema de tu aplicación.
  // Actualmente, los colores están definidos para un tema claro.

  return (
    // Overlay del Modal:
    // - `fixed inset-0 z-50`: Cubre toda la pantalla y se posiciona por encima de todo.
    // - `flex items-center justify-center`: Centra el contenido del modal en el medio de la pantalla.
    // - `transition-opacity duration-300 ease-out`: Animación de opacidad suave para el fondo.
    // - `opacity-100 visible` / `opacity-0 invisible`: Controla si el overlay es visible o no.
    // - `bg-black/50`: Un fondo negro semi-transparente más pronunciado (50% de opacidad)
    //   para oscurecer el contenido detrás.
    // - `backdrop-blur-md`: Un desenfoque de fondo moderado que da un efecto de "cristal esmerilado".
    //   Si el contenido del modal sigue viéndose borroso, la causa no es este `backdrop-blur`,
    //   sino algún otro problema de renderizado del navegador o la GPU.
    // - `style={{ display: openModal ? "flex" : "none" }}`: Esto es CRUCIAL. Asegura que el modal
    //   se retira completamente del flujo del documento cuando no está abierto, mejorando el rendimiento
    //   y evitando posibles problemas de accesibilidad o renderizado cuando está oculto.
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-300 ease-out
        ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}
       bg-gray-900/5
        backdrop-blur-md
      `}
      style={{ display: openModal ? "flex" : "none" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-modal-title"
    >
      {/* Contenedor del Contenido del Modal (la "tarjeta" blanca donde va el texto y spinner) */}
      {/* ¡Animación "Bonita" aquí! */}
      {/*
        - `transform transition-all duration-300 ease-out`: Aplica la transición para cualquier cambio
          en las propiedades `transform` (scale, translate) durante 300ms con un efecto suave.
        - `${openModal ? "scale-100 translate-y-0" : "scale-95 -translate-y-8"}`:
          - Cuando `openModal` es `true` (modal abierto):
            - `scale-100`: El modal está en su tamaño normal.
            - `translate-y-0`: El modal está en su posición vertical original (centrado).
          - Cuando `openModal` es `false` (modal cerrado/escondido):
            - `scale-95`: El modal se reduce ligeramente (95% de su tamaño normal).
            - `-translate-y-8`: El modal se mueve 32 píxeles hacia arriba (-8 unidades de Tailwind).
              Esto hace que el modal empiece ligeramente por encima de su posición final.
        - El resultado es un efecto de "aterrizaje" o "pop-in" suave, donde el modal parece
          caer sutilmente desde arriba y expandirse a su tamaño completo.
      */}
      <div
        className={`
          bg-white text-gray-900           // Fondo blanco limpio, texto oscuro para el modo claro
          rounded-2xl p-8 shadow-xl         // Esquinas más redondeadas (como iOS), padding generoso, sombra refinada
          flex flex-col items-center justify-center gap-4 // Disposición vertical de elementos con espaciado
          max-w-xs sm:max-w-sm w-full       // Ancho responsivo para adaptarse a diferentes pantallas
          transform transition-all duration-300 ease-out // Aplica la transición de forma suave
          ${
            openModal ? "scale-100 translate-y-0" : "scale-95 -translate-y-8"
          } // ✨ Esta es la animación clave ✨
        `}
      >
        {/* Contenido: Texto y Spinner */}
        <div className="flex items-center gap-4">
          {" "}
          {/* Contenedor para alinear texto y spinner horizontalmente */}
          <h2
            id="loading-modal-title"
            className="text-xl font-semibold text-gray-800" // Texto claro y legible
            aria-live="assertive" // Anuncia los cambios de contenido a los lectores de pantalla inmediatamente
            aria-atomic="true" // Asegura que todo el contenido del elemento se anuncie como una unidad
          >
            {text}
          </h2>
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-blue-500 animate-spin" // Spinner azul vibrante con animación de giro
            size="2x" // Tamaño del icono
          />
        </div>
      </div>
    </div>
  );
}
