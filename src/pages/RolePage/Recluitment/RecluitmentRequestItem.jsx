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
import {
  RequestRoleFlow,
  getRequestRoleFlowName,
} from "../../../contansts/RequestRoleFlowState";
import { RequisitionState } from "../../../contansts/RequisitionState";
export default function RecluitmentRequestItem({ request, expandedRequest }) {
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

  const isDisabled =
    request.workflowState === RequestRoleFlow.COMPLETED ||
    !request.workflowEnabled;

  useEffect(() => {
    setComment(request?.workflowComment ?? "");
  }, [request]);

  const handleApprove = () => {
    if (isDisabled) return;
    setRequisitionId(request.id);
    setRequestState(1);
    setWorkflowId(request.workflowId);
    setModalMessage(`¿Desea aprobar la Solicitud ${request.id}?`);
    setModalState(true);
  };

  const handleReject = () => {
    if (isDisabled) return;
    setRequisitionId(request.id);
    setRequestState(2);
    setWorkflowId(request.workflowId);
    setModalMessage(`¿Desea rechazar la Solicitud ${request.id}?`);
    setModalState(true);
  };

  const handleDetails = () => {
    if (isDisabled) return;
    navigate("/infoNewRequisition", {
      state: { requisition: request, action: "update" },
    });
  };

  return (
    <div
      className={`
        rounded-2xl bg-white shadow-sm border border-gray-100 
        overflow-hidden transition-all duration-300 m-3
        ${isDisabled ? "opacity-50 pointer-events-none" : "hover:shadow-md"}
      `}
    >
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
            Role.Reclutamiento
          )
            .then(() => {
              navigate(0); // Recarga tras aprobar/rechazar
            })
            .catch((err) => console.error("Error al actualizar estado:", err))
        }
        data={request}
      />

      {/* HEADER - Igual a Payroll */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 overflow-hidden relative">
        {/* Fondo animado con onda arcoíris */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="h-full w-[300%] animate-rainbow-wave"
            style={{
              background: `linear-gradient(90deg,
          #fee2e2 0%,
          #fef3c7 10%,
          #ecfccb 20%,
          #dbeafe 30%,
          #e0e7ff 40%,
          #dbeafe 50%,
          #ecfccb 60%,
          #fef3c7 70%,
          #fee2e2 80%,
          #fee2e2 100%
        )`,
              backgroundSize: "300% 100%",
              opacity: 0.25,
            }}
          />
        </div>

        {/* Contenido encima */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 border-2 border-dashed rounded-lg"></div>
          <p className="text-gray-800 font-semibold text-lg">
            Requisición:{" "}
            <span className="font-normal">{request?.id || "449"}</span>
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {getRequestRoleFlowName(request.workflowState)}
          </span>
          <span>
            Fecha Creación:{" "}
            {request?.createdDate
              ? new Date(request.createdDate)
                  .toLocaleString("es-CR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")
              : "12/11/2025, 03:05"}
          </span>
          <span>Creador: {request?.user?.name || "Usuario Prueba"}</span>
        </div>
      </div>

      {/* CUERPO - Comentario SIEMPRE visible + botones */}
      <div className="px-6 py-3 bg-white flex flex-col sm:flex-row gap-3">
        {/* Comentario */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isDisabled}
          placeholder="Comentario..."
          rows={1}
          className={`
            flex-1 min-w-0 p-2 text-sm border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none
            ${
              isDisabled
                ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white border-gray-300"
            }
          `}
        />

        {/* Botones */}
        <div className="flex gap-2 justify-end">
          {request?.state === RequisitionState.COMPLETED ? (
            <>
              <button
                onClick={handleApprove}
                className={`
                  flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border 
                  transition-all active:scale-95
                  ${
                    isDisabled
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-green-600 border-green-300 hover:bg-green-50 hover:border-green-400"
                  }
                `}
              >
                <FontAwesomeIcon icon={faCheck} />
                Aprobar
              </button>

              <button
                onClick={handleReject}
                className={`
                  flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border 
                  transition-all active:scale-95
                  ${
                    isDisabled
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                  }
                `}
              >
                <FontAwesomeIcon icon={faXmark} />
                Rechazar
              </button>

              <button
                onClick={handleDetails}
                className={`
                  flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border 
                  transition-all active:scale-95
                  ${
                    isDisabled
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                Detalles
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-xs ml-1"
                />
              </button>
            </>
          ) : (
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed">
              <FontAwesomeIcon icon={faCheck} />
              Aprobado
            </button>
          )}
        </div>
      </div>

      {/* SECCIÓN EXPANDIDA */}
      {expandedRequest === request?.id && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-3">
            Detalles de la Solicitud
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <p>
              <strong>Tipo de Acción:</strong> Cambio de supervisor
            </p>
            <p>
              <strong>Fecha:</strong> {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>Supervisor Anterior:</strong> Juan Pérez
            </p>
            <p>
              <strong>Nuevo Supervisor:</strong> María Gómez
            </p>
            <p>
              <strong>Motivo:</strong> Reorganización del equipo
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
