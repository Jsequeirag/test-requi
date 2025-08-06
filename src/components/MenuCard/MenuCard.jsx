import React from "react";
import { FileText, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Contenido de la carta (se mantiene como estaba, sus valores pueden ser sobrescritos por props)

export default function MenuCard({
  requestCount = 0,
  title = "Sin titulo", // El título del prop ahora es el default, si no se pasa, usa el de payrollCardContent
  description = "Sin descripcion", // La descripción del prop ahora es el default
  path = "/default-path",
  icon = <FileText className="w-8 h-8 text-white" />, // Un default más explícito para path si no se pasa
}) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    // Simulación de navegación, usando el 'path' que se pasa como prop
    console.log(`Navegando a: ${path}`);
    // Aquí es donde usarías useNavigate de 'react-router-dom' si lo tuvieras:

    navigate(path, {
      state: {
        action: "create",
      },
    });
  };

  return (
    <div className="relative w-80 h-96 group cursor-pointer">
      {/* Carta principal */}
      <div
        onClick={handleNavigation} // Usa la función de navegación que consume el 'path' prop
        className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 
                   rounded-3xl border border-blue-200/50 
                   transform transition-all duration-500 ease-out
                   hover:scale-[1.02] hover:-translate-y-2
                   shadow-lg hover:shadow-2xl hover:shadow-blue-200/25
                   focus:outline-none focus:ring-4 focus:ring-blue-300/50
                   overflow-hidden"
        tabIndex="0"
        role="button"
        aria-label={`Ver ${title}`} // Actualizado para usar el título dinámico
      >
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/20 to-blue-300/20 rounded-full blur-2xl"></div>
        </div>

        {/* Efecto de brillo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                       -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]
                       transition-transform duration-1000"
        ></div>

        {/* Badge de notificación */}
        {requestCount > 0 && (
          <div className="absolute top-4 right-4 z-20">
            <div className="relative">
              <div
                className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center
                                     text-sm font-bold shadow-lg animate-pulse"
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
                className="bg-blue-500 rounded-2xl p-4 w-fit mb-4 
                                     transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                {icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                {title} {/* Usando el prop 'title' */}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {description} {/* Usando el prop 'description' */}
              </p>
            </div>
          </div>

          {/* Espacio flexible para centrar mejor el contenido */}
          <div className="flex-1"></div>

          {/* Botón de acción */}
          <div>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                                     text-white font-semibold py-3 px-6 rounded-2xl
                                     transform transition-all duration-300
                                     hover:from-blue-700 hover:to-indigo-700
                                     hover:shadow-lg hover:shadow-blue-500/25
                                     focus:outline-none focus:ring-4 focus:ring-blue-300/50
                                     flex items-center justify-center space-x-2
                                     group-hover:scale-105"
            >
              <span>Ir</span>
              {/* Usa el buttonText de payrollCardContent ya que no hay un prop para él */}
              <ChevronRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
