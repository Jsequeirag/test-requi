import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AsyncModal from "../../../components/AsyncComponents/AsyncModal";
import { setStateRequestRoleFlow } from "../../../api/urls/RequestRoleFlow";

export default function RecluitmentRequestItem({
  request,
  expandedRequest,
  handleExpand,
}) {
  const today = new Date().toLocaleDateString();

  // 🧠 Estados locales
  const [modalState, setModalState] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [comment, setComment] = useState(""); // comentario editable
  const [requestState, setRequestState] = useState("");

  // 🧩 Cargar comentario inicial
  useEffect(() => {
    if (
      request?.workflowComment !== undefined &&
      request?.workflowComment !== null
    ) {
      setComment(request.workflowComment);
    } else {
      setComment("");
    }
  }, [request]);

  const handleApprove = () => setModalState(true);
  const handleReject = () => setModalState(true);

  return (
    <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 m-4 overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <AsyncModal
        setOpenModal={setModalState}
        message={modalMessage}
        openModal={modalState}
        request={() =>
          setStateRequestRoleFlow({
            id: request?.workflowId,
            requisitionId: request?.id,
            state: requestState,
            comment: comment,
          })
        }
        data={request}
      />

      {/* Header */}
      <div className="flex items-center bg-white/30 dark:bg-gray-900/40 backdrop-blur-md px-6 py-4 rounded-t-xl border-b border-gray-200 justify-between gap-4 flex-wrap dark:border-gray-600">
        <p className="text-gray-800 font-bold text-xl dark:text-gray-100">
          Requisición:
          <span className="font-normal text-lg">
            {request?.id || "PRUEBA-001"}
          </span>
        </p>

        {/* Estado */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            request?.requestRoleFlowState?.toLowerCase() === "pendiente"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300"
              : request?.state === "aprobado"
              ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300"
              : "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300"
          }`}
        >
          {request?.requestRoleFlowState}
        </span>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Fecha Creación:</span>{" "}
          <span className="font-medium">
            {request?.createdDate
              ? new Date(request?.createdDate).toLocaleString()
              : new Date().toLocaleString()}
          </span>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Creador:</span>{" "}
          <span className="font-medium">
            {request?.user?.name || "Usuario Prueba"}
          </span>
        </p>

        {/* === Campo de comentario === */}
        <div className="w-full mt-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comentario..."
            rows={1}
            className="w-full text-xs p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-green-500 focus:outline-none resize-none min-h-[30px]"
          />
        </div>

        {/* === Botones === */}
        <div className="flex space-x-3 mt-3 sm:mt-0">
          {request?.state !== "aprobado" ? (
            <>
              {/* Aprobar */}
              <button
                onClick={() => {
                  setRequestState(1);
                  setModalMessage(`Desea aprobar la Solicitud ${request.id}`);
                  handleApprove();
                }}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 active:scale-95 transition-all duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />
                <span>Aprobar</span>
              </button>

              {/* Rechazar */}
              <button
                onClick={() => {
                  setRequestState(2);
                  setModalMessage(`Desea rechazar la Solicitud ${request.id}`);
                  handleReject();
                }}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 active:scale-95 transition-all duration-200 text-sm font-medium"
              >
                <FontAwesomeIcon icon={faXmark} className="mr-2 text-base" />
                <span>Rechazar</span>
              </button>
            </>
          ) : (
            <button
              disabled
              className="flex items-center bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />
              <span>Aprobado</span>
            </button>
          )}

          {/* Expandir / Colapsar */}
          <button
            onClick={() => handleExpand(request?.id)}
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 active:scale-95 transition-all duration-200 text-sm font-medium dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 border border-gray-300"
          >
            <span>
              {expandedRequest === request?.id ? "Ocultar" : "Detalles"}
            </span>
            <FontAwesomeIcon
              icon={
                expandedRequest === request?.id ? faChevronUp : faChevronDown
              }
              className="ml-2 text-xs"
            />
          </button>
        </div>
      </div>

      {/* === Sección expandida === */}
      {expandedRequest === request?.id && (
        <div className="bg-white/30 dark:bg-gray-900/40 px-6 py-4 border-t border-gray-100 text-gray-700 animate-slide-down dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
          <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Detalles de la Solicitud
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-base">
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
          </div>
        </div>
      )}
    </div>
  );
}
