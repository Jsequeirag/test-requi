import React from "react";
import { FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MenuCard({
  requestCount = 1,
  title = "Sin titulo",
  description = "Sin descripcion",
  path = "/default-path",
  // CAMBIO CLAVE 1: Color por defecto del icono para que se vea bien en fondos claros
  icon = <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  bgColor,
}) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    console.log(`Navegando a: ${path}`);
    navigate(path, {
      state: {
        action: "create",
      },
    });
  };

  return (
    <div className="relative w-80 h-96 group cursor-pointer">
      {/* Carta principal con efecto de cristal esmerilado (Glassmorphism) */}
      <div
        onClick={handleNavigation}
        className={`relative w-full h-full bg-white/30 dark:bg-gray-900/40    backdrop-blur-md
                   rounded-3xl border border-white/80
                   transform transition-all duration-500 ease-out
                   hover:scale-[1.02] hover:-translate-y-2
                   shadow-xl hover:shadow-2xl
                   shadow-blue-100/50 hover:shadow-blue-200/50
                   focus:outline-none focus:ring-4 focus:ring-blue-300/50
                   overflow-hidden
                     dark:border-gray-700/80 dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40`} // Dark mode support
        tabIndex="0"
        role="button"
        aria-label={`Ver ${title}`}
      >
        {/* Patrón de fondo decorativo sutil (luces o formas abstractas) */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-indigo-300/10 rounded-full blur-2xl"></div>
        </div>

        {/* Efecto de brillo (se mantiene, es compatible con el estilo) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                       -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]
                       transition-transform duration-1000"
        ></div>

        {/* Badge de notificación */}
        {requestCount > 0 && (
          <div className="absolute top-5 right-5 z-20">
            <div className="relative">
              <div
                className="bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center
                           text-xs font-bold shadow-md animate-pulse"
              >
                {requestCount > 99 ? "99+" : requestCount}
              </div>
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Encabezado */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div
                className={` ${bgColor}  backdrop-blur-md rounded-xl p-3 w-fit mb-4
                           shadow-md border border-white/90 dark:border-gray-700/90
                           transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                {/* CAMBIO CLAVE 2: Asegurar que el icono reciba un color visible */}
                {/* Aquí el 'icon' prop ya viene con el color, solo asegúrate de que no sea 'text-white' */}
                {icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 leading-tight dark:text-gray-100">
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>

          {/* Espacio flexible para centrar mejor el contenido */}
          <div className="flex-1"></div>

          {/* Botón de acción */}
          <div>
            <button
              className="w-full bg-blue-500 text-white font-medium py-3 px-6 rounded-2xl
                         transition-all duration-300 ease-in-out
                         hover:bg-blue-600 hover:shadow-md hover:shadow-blue-300/50
                         focus:outline-none focus:ring-4 focus:ring-blue-200/50
                         flex items-center justify-center space-x-2
                         group-hover:scale-105
                         dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600/50"
            >
              <span>Ir</span>
              <ChevronRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
