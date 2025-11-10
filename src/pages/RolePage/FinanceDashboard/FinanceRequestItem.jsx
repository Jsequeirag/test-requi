import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import AsyncModal from "../../../components/AsyncComponents/AsyncModal";
import { updateStateRequestRoleFlow } from "../../../api/urls/RequestRoleFlow";
import { useNavigate } from "react-router-dom";
import { Role } from "../../../contansts/roles";
export default function FinanceRequestItem({ request, expandedRequest }) {
  const today = new Date().toLocaleDateString();
  const [modalState, setModalState] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [requestState, setRequestState] = useState("");
  const [requisitionId, setRequisitionId] = useState("");
  const [workflowId, setWorkflowId] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const fullName = JSON.parse(
    localStorage.getItem("requitool-employeeInfo")
  ).name;

  // 🧠 Cargar comentario inicial solo una vez que llega la solicitud
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
    <div className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 m-4 overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <AsyncModal
        setOpenModal={setModalState}
        message={modalMessage}
        openModal={modalState}
        request={() =>
          updateStateRequestRoleFlow(
            workflowId,
            requisitionId,
            requestState,
            comment,
            fullName,
            Role.Payroll
          )
            .then(() => {
              // 🟢 Recargar la página si la solicitud se actualiza correctamente
              navigate(0);
            })
            .catch((err) => {
              console.error("Error al actualizar estado:", err);
            })
        }
        data={request}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between bg-white/40 dark:bg-gray-900/40 backdrop-blur-md px-6 py-4 rounded-t-xl border-b border-gray-200 dark:border-gray-700 gap-3">
        <p className="text-gray-800 font-bold text-lg dark:text-gray-100">
          Requisición:{" "}
          <span className="font-normal">{request?.id || "PRUEBA-001"}</span>
        </p>

        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            request?.requestRoleFlowState?.toLowerCase() === "pendiente"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300"
              : request?.state === "aprobado"
              ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300"
              : "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300"
          }`}
        >
          {request?.requestRoleFlowState}
        </span>

        <p className="text-xs text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Fecha Creación:</span>{" "}
          {request?.createdDate
            ? new Date(request?.createdDate).toLocaleString()
            : new Date().toLocaleString()}
        </p>

        <p className="text-xs text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Creador:</span>{" "}
          {request?.user?.name || "Usuario Prueba"}
        </p>
      </div>

      {/* Cuerpo compacto */}
      <div className="flex sm:flex-row items-center justify-between gap-2 px-6 py-3 bg-white dark:bg-gray-800">
        {/* Comentario editable */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comentario..."
          rows={1}
          className="flex-1 text-xs p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-green-500 focus:outline-none resize-none min-h-[30px]"
        />

        {/* Botones compactos */}
        <div className="flex-1 gap-2 w-full sm:w-auto justify-end flex-row flex space-x-2">
          {request?.state !== "aprobado" ? (
            <>
              {/* Aprobar */}
              <button
                disabled={request.requestRoleFlowState === "Completado"}
                onClick={() => {
                  setRequisitionId(request.id);
                  setRequestState(1);
                  setWorkflowId(request.workflowId);
                  setModalMessage(`Desea aprobar la Solicitud ${request.id}`);
                  handleApprove();
                }}
                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-md font-semibold transition-all focus:ring-1 focus:ring-green-400 active:scale-95"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-1 text-sm" />
                Aprobar
              </button>

              {/* Rechazar */}
              <button
                disabled={request.requestRoleFlowState === "Completado"}
                onClick={() => {
                  setRequisitionId(request.id);
                  setRequestState(2);
                  setWorkflowId(request.workflowId);
                  setModalMessage(`Desea rechazar la Solicitud ${request.id}`);
                  handleReject();
                }}
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-semibold transition-all focus:ring-1 focus:ring-red-400 active:scale-95"
              >
                <FontAwesomeIcon icon={faXmark} className="mr-1 text-sm" />
                Rechazar
              </button>

              {/* Detalles */}
              <button
                onClick={() => {
                  navigate("/infoNewRequisition", {
                    state: {
                      requisition: request,
                      hasPrevRequisition: null,
                      prevRequisition: null,
                      action: "update",
                    },
                  });
                }}
                className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-medium transition-all border border-gray-200 dark:border-gray-600"
              >
                {expandedRequest === request?.id ? "Ocultar" : "Detalles"}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="ml-1 text-[10px]"
                />
              </button>
            </>
          ) : (
            <button className="flex items-center justify-center bg-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md cursor-not-allowed">
              <FontAwesomeIcon icon={faCheck} className="mr-1 text-sm" />
              Aprobado
            </button>
          )}
        </div>
      </div>

      {/* Sección expandida */}
      {expandedRequest === request?.id && (
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">
          <h4 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Detalles de la Solicitud
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
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
