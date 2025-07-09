import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AsyncModal from "../../components/AsyncComponents/AsyncModal"; // Asegúrate de que esta ruta sea correcta
import { setStateRequestRoleFlow } from "../../api/urls/RequestRoleFlow";

export default function RequestItem({
  request,
  expandedRequest,
  handleExpand,
}) {
  const today = new Date().toLocaleDateString();
  const [modalState, setModalState] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleApprove = () => {
    // Aquí iría la lógica para aprobar la solicitud
    setModalState(true);
  };

  const handleReject = () => {
    // Aquí iría la lógica para rechazar la solicitud
    setModalState(true);
  };

  return (
    // Contenedor principal con sombra y bordes redondeados como una "tarjeta" de iOS/macOS
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 m-4 overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <AsyncModal
        setOpenModal={setModalState}
        openModal={modalState}
        message={modalMessage}
        request={setStateRequestRoleFlow}
        data={request}
      />

      {/* Cabecera de la tarjeta con efecto "difuminado" y bordes redondeados solo arriba */}
      <div className="flex items-center bg-gray-50/70 backdrop-blur-md px-6 py-4 rounded-t-xl border-b border-gray-200 justify-between gap-4 flex-wrap dark:bg-gray-700/70 dark:border-gray-600">
        <p className="text-gray-800 font-bold text-xl dark:text-gray-100">
          {" "}
          {/* Título principal más grande y en negrita */}
          Requisición:{" "}
          <span className="font-normal text-lg">
            {request?.id || "PRUEBA-001"}
          </span>{" "}
          {/* ID ligeramente más pequeño y normal */}
        </p>

        {/* Etiqueta de estado con colores sutiles y forma de pastilla */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            /* font-semibold para un poco más de énfasis */
            request?.state?.toLowerCase() === "pendiente"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300"
              : request?.state === "aprobado"
              ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300"
              : "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300"
          }`}
        >
          {request?.state || "Prueba"}
        </span>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {" "}
          {/* Color ligeramente más oscuro para etiquetas */}
          <span className="font-semibold">Fecha Creación:</span>{" "}
          {/* Negrita para la etiqueta */}
          <span className="font-medium">
            {request?.createdDate
              ? new Date(request?.createdDate).toLocaleString()
              : new Date().toLocaleString()}
          </span>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {" "}
          {/* Color ligeramente más oscuro para etiquetas */}
          <span className="font-semibold">Creador:</span>{" "}
          {/* Negrita para la etiqueta */}
          <span className="font-medium">
            {request?.user?.name || "Usuario Prueba"}
          </span>
        </p>

        {/* Contenedor de botones con espaciado consistente */}
        <div className="flex space-x-3 mt-2 sm:mt-0">
          {/* Botones de acción con estilo iOS/macOS */}
          {request?.state !== "aprobado" ? (
            <>
              {/* Botón Aprobar */}
              <button
                onClick={() => {
                  setModalMessage(
                    "Desea aprobar la Solicitud # por requestType"
                  ),
                    handleReject();
                }}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 active:scale-95 transition-all duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />
                <span>Aprobar</span>
              </button>

              {/* Botón Rechazar */}
              <button
                onClick={() => {
                  setModalMessage(
                    "Desea rechazar la Solicitud # por requestType"
                  ),
                    handleReject();
                }}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 active:scale-95 transition-all duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon icon={faXmark} className="mr-2 text-base" />
                <span>Rechazar</span>
              </button>
            </>
          ) : (
            // Si el estado es "aprobado", puedes mostrar un botón deshabilitado o solo el botón de detalles
            <button
              disabled
              className="flex items-center bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />
              <span>Aprobado</span>
            </button>
          )}

          {/* Botón de expandir/colapsar con icono integrado */}
          <button
            onClick={() => handleExpand(request?.id)}
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 active:scale-95 transition-all duration-200 text-sm font-medium dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            <span>
              {expandedRequest === request?.id ? "Ocultar" : "Detalles"}
            </span>
            <FontAwesomeIcon
              icon={
                expandedRequest === request?.id ? faChevronUp : faChevronDown
              }
              className="ml-2 text-xs" // Tamaño del icono más pequeño
            />
          </button>
        </div>
      </div>

      {/* Sección de detalles expandida con un fondo suave y animación */}
      {expandedRequest === request?.id && (
        <div
          className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-gray-700 animate-slide-down
                     dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300" // Clases de modo oscuro
        >
          <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {" "}
            {/* Título de sección más grande y bold */}
            Detalles de la Solicitud
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-base">
            {" "}
            {/* Espaciado mejorado */}
            <p>
              <strong className="text-gray-700 dark:text-gray-400">
                Tipo de Acción:
              </strong>{" "}
              Cambio de supervisor
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-400">
                Fecha:
              </strong>{" "}
              {today}
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-400">
                Supervisor Anterior:
              </strong>{" "}
              Juan Pérez
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-400">
                Nuevo Supervisor:
              </strong>{" "}
              María Gómez
            </p>
            <p>
              <strong className="text-gray-700 dark:text-gray-400">
                Motivo:
              </strong>{" "}
              Reorganización del equipo
            </p>
            {/* Puedes añadir más datos de prueba aquí */}
          </div>
        </div>
      )}
    </div>
  );
}
