// NavItem.js (Este archivo debería estar separado, por ejemplo, en src/components/NavItem.js)
import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación

// Este componente NavItem es responsable de renderizar cada elemento individual del menú de navegación.
// Recibe el componente de icono de Lucid React a través de la prop 'icon'.
const NavItem = ({
  icon: IconComponent,
  text,
  navigateTo,
  hasNotification = false,
  hiddenMenu,
  theme,
}) => {
  const navigate = useNavigate(); // Hook para la navegación programática

  return (
    <li
      // Clases Tailwind CSS para el estilo del elemento de lista
      className={`nav-link relative h-12 flex items-center ${theme.hoverColor} rounded-lg
                  transition-all duration-200 cursor-pointer group`}
    >
      <a
        // Clases Tailwind CSS para el estilo del enlace
        className={`no-underline h-full w-full flex items-center
                    text-gray-700 dark:text-gray-300
                    hover:text-gr-700 dark:hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-300/50
                    active:scale-[0.98]
                    ${hiddenMenu ? "justify-center" : "justify-start"}`}
        onClick={() => navigate(navigateTo)} // Maneja la navegación al hacer clic
        role="menuitem" // Semántica para accesibilidad
        tabIndex="0" // Permite enfocar con el teclado
      >
        {/* === PARTE CRÍTICA: RENDERIZADO DEL ICONO DE LUCID REACT === */}
        {/* Se verifica si IconComponent existe antes de renderizarlo */}
        {IconComponent && (
          <IconComponent
            size={24} // Tamaño del icono (puedes ajustar esto)
            // Clases Tailwind CSS para el estilo del icono
            className="min-w-[60px] flex items-center justify-center text-2xl
                       group-hover:text-black dark:group-hover:text-white"
            // Puedes pasar props adicionales de Lucid como 'color' o 'strokeWidth' aquí
            // Por ejemplo: color="currentColor" para que el icono herede el color del texto
          />
        )}

        {/* Texto del elemento de navegación */}
        <span
          className={`text nav-text font-semibold whitespace-nowrap overflow-hidden
                      ${hiddenMenu ? "w-0 opacity-0" : "w-auto opacity-100"}
                      transition-all duration-200 delay-100`}
        >
          {text}
        </span>

        {/* Indicador de notificación (si hasNotification es true) */}
        {hasNotification && (
          <span
            className={`absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full
                        ${hiddenMenu ? "left-[calc(50%+10px)]" : ""}
                        transition-all duration-200`}
          ></span>
        )}
      </a>

      {/* Tooltip visible cuando el menú está colapsado y se hace hover */}
      {hiddenMenu && (
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-[100]
                      px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 delay-500 whitespace-nowrap pointer-events-none
                      before:content-[''] before:absolute before:top-1/2 before:-left-1
                      before:-translate-y-1/2 before:border-4 before:border-transparent
                      before:border-r-gray-900 dark:bg-gray-700 dark:before:border-r-gray-700"
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default NavItem; // Exporta el componente para poder usarlo en otros archivos
