import React, { useEffect, useState, useRef } from "react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../components/Button/Button";
import TextButton from "../../components/Button/TextButton";
import formStore from "../../../stores/FormStore.js";
import { getRequisitionStateName } from "../../contansts/RequisitionState";
import {
  faPlusCircle,
  faFilter,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faChevronLeft,
  faSearch,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApiGet } from "../../api/config/customHooks";
import { getRequestByUserId } from "../../api/urls/Request";
import { getLocalStorageKeyValue } from "../../utils/localstore";
import RequisitionSkn from "../../components/Skeleton/RequisitionSkn.jsx";
import ModalContainer from "../../components/modal/ModalContainer.jsx";
import RequisitionFilters from "./RequisitionFilters.jsx";
// ==================== Paginación ====================
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between bg-white/30 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 px-4 py-3 border-t">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Mostrar</span>{" "}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value={5}>5</option> <option value={10}>10</option>{" "}
          <option value={20}>20</option> <option value={50}>50</option>{" "}
        </select>{" "}
        <span className="text-sm text-gray-700">por página</span>{" "}
      </div>{" "}
      <div className="flex items-center space-x-1 roun">
        {" "}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {" "}
          <FontAwesomeIcon icon={faChevronLeft} />{" "}
        </button>
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={typeof page !== "number"}
            className={`px-3 py-1 text-sm border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : typeof page === "number"
                ? "hover:bg-gray-50"
                : "cursor-default"
            }`}
          >
            {" "}
            {page}{" "}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

// ==================== Principal ====================
function Requisitions() {
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterState, setFilterState] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const employeeLoggedDeparment = getLocalStorageKeyValue(
    "requitool-employeeInfo",
    "descripDepartamento"
  );

  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Estados principales
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [expandedRequest, setExpandedRequest] = useState(null);

  // 🔍 Filtros funcionales
  const [filters, setFilters] = useState({
    state: "",
    requestId: "",
    startDate: "",
    endDate: "",
  });

  // ==================== Hook API ====================
  const {
    data: requestData,
    isSuccess: requestIsSuccess,
    isPending: requestIsPending,
    refetch: refetchRequests,
    isFetching,
  } = useApiGet(
    ["RequestByUser", currentPage, pageSize, filters],
    () =>
      getRequestByUserId(
        getLocalStorageKeyValue("requitool-employeeInfo", "id"),
        currentPage,
        pageSize,
        filters.state,
        filters.requestId,
        filters.startDate,
        filters.endDate
      ),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    }
  );

  // ✅ Normalización
  const normalizedData = requestData?.data
    ? requestData.data
    : requestData?.data || requestData;

  // ==================== Cálculos de paginación ====================
  const totalRecords = normalizedData?.totalRecords ?? 0;
  const pageSizeValue = normalizedData?.pageSize ?? pageSize ?? 1;
  const totalPages = requestData
    ? Math.ceil(requestData.totalRecords / requestData.pageSize)
    : 0;
  const startRecord =
    totalRecords > 0 ? (currentPage - 1) * pageSizeValue + 1 : 0;
  const endRecord =
    totalRecords > 0 ? Math.min(currentPage * pageSizeValue, totalRecords) : 0;

  // ==================== Handlers ====================
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setExpandedRequest(null);
  };
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    setExpandedRequest(null);
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    await refetchRequests();
  };

  const handleReset = async () => {
    setFilters({ state: "", requestId: "", startDate: "", endDate: "" });
    setCurrentPage(1);
    await refetchRequests();
  };

  const handleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (location.state && location.state.refresh) {
      refetchRequests();
    }
  }, [location.state, refetchRequests]);
  //FILTROS

  useEffect(() => {
    setCurrentPage(1);
    refetchRequests();
  }, [filters]);
  // ==================== Render ====================
  return (
    <Layout>
      <ModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedRequisition
            ? `Requisición #${selectedRequisition.id}`
            : "Detalles de Requisición"
        }
        width="40rem"
        className="border border-gray-200 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-xl shadow-lg"
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <p className="text-lg font-semibold">
              {selectedRequisition?.requestType?.name || "Tipo no definido"}
            </p>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                selectedRequisition?.state === "Completado"
                  ? "bg-green-400 text-black"
                  : "bg-gray-400 text-black"
              }`}
            >
              {selectedRequisition?.state === "En Proceso"
                ? "Incompleto"
                : selectedRequisition?.state}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Empleado:</strong>{" "}
            {selectedRequisition?.externalEmployee?.fullname ||
              selectedRequisition?.infoEmpleadoAkilesDto?.nombre ||
              "N/A"}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Departamento:</strong>{" "}
            {selectedRequisition?.infoEmpleadoAkilesDto?.descrip_Departamento ||
              "N/A"}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Fecha de creación:</strong>{" "}
            {new Date(selectedRequisition?.createdDate).toLocaleString()}
          </p>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 italic">
              🧱 En desarrollo — próximamente verás los detalles completos aquí.
            </p>
          </div>
        </div>
      </ModalContainer>
      <div className="m-4 ">
        <div className="border-b bg-white/30 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-md h-full">
          <div className="flex items-center border-b p-4 mx-2 justify-between">
            <div className="flex items-center p-4 mx-2">
              <a
                href="/supervisor"
                className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                <TextButton
                  text={"Atrás"}
                  className="p-0 text-lg font-medium"
                />
              </a>
              <h1 className="px-9 text-3xl p-4">Lista de Requisiciones</h1>
            </div>
          </div>

          <RequisitionFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            onSearch={handleSearch}
            showSearchButton={false} // cámbialo a true si quieres un botón Buscar
          />
          {/* Información de paginación */}
          {requestIsSuccess && requestData && (
            <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600 rounded-md mx-4">
              <div>
                Mostrando {startRecord} a {endRecord} de {totalRecords}{" "}
                solicitudes
              </div>
              <div>
                Página {currentPage} de {totalPages}
              </div>
            </div>
          )}
          {/* Contenedor principal */}
          <div className="space-y-4 p-4">
            {!requestIsPending && !isFetching ? (
              <>
                {requestIsSuccess && requestData && requestData.data ? (
                  requestData.data.length > 0 ? (
                    requestData.data.map((request, index) => (
                      <div key={request.id} className="border rounded-md">
                        {/* Header de la requisición */}
                        <div className="relative flex items-center bg-slate-50 p-4 rounded-md justify-between overflow-hidden">
                          {" "}
                          <div
                            className={`
      absolute inset-0 pointer-events-none
      ${expandedRequest === request.id ? "animate-rainbow-wave" : ""}
    `}
                            style={{
                              background:
                                expandedRequest === request.id &&
                                `linear-gradient(90deg,
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
                              opacity: 0.2,
                            }}
                          />
                          <span
                            className={`p-2 rounded-md font-semibold text-black ${
                              request.state === "Completado"
                                ? "bg-yellow-400"
                                : "bg-blue-400"
                            }`}
                          >
                            {request.state}
                          </span>
                          <p className="text-sm">
                            <strong>Solicitud:</strong> {request.id}
                          </p>
                          <p className="text-sm">
                            <strong>Fecha:</strong>{" "}
                            {new Date(request.createdDate).toLocaleString()}
                          </p>
                          <p className="text-sm">
                            <strong>Creador:</strong> {request.user.name}
                          </p>
                          <button
                            onClick={() => handleExpand(request.id)}
                            className="flex items-center bg-blue-500 text-black px-3 py-2 rounded-md hover:bg-blue-600 transition-all"
                          >
                            <span>
                              {expandedRequest === request.id
                                ? "Ocultar detalles"
                                : "Ver detalles"}
                            </span>
                            <FontAwesomeIcon
                              icon={
                                expandedRequest === request.id
                                  ? faChevronUp
                                  : faChevronDown
                              }
                              className="ml-2"
                            />
                          </button>
                        </div>

                        {/* Contenido expandible */}
                        <div
                          className={`transition-all duration-500 ease-out overflow-hidden ${
                            expandedRequest === request.id
                              ? "opacity-100 max-h-screen"
                              : "opacity-0 max-h-0"
                          }`}
                          style={{
                            transitionDelay:
                              expandedRequest === request.id
                                ? `${index * 75}ms`
                                : "0ms",
                          }}
                        >
                          <div
                            id={`request-${request.id}`}
                            className="relative w-full py-12"
                          >
                            <button
                              onClick={() => scroll("left")}
                              className="absolute left-[-2.2rem] top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 rounded-full border shadow hover:scale-105"
                              style={{ width: 40, height: 40 }}
                            >
                              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                            </button>
                            <button
                              onClick={() => scroll("right")}
                              className="absolute right-[-2.2rem] top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 rounded-full border shadow hover:scale-105"
                              style={{ width: 40, height: 40 }}
                            >
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                size="lg"
                              />
                            </button>
                            {/* Ordenamiento de requisiciones */}
                            <div className="flex flex-wrap items-center justify-start w-full gap-4 mb-4 px-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-600">
                                  Ordenar por fecha:
                                </span>
                                <select
                                  value={sortOrder}
                                  onChange={(e) => setSortOrder(e.target.value)}
                                  className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="desc">
                                    Más recientes primero
                                  </option>
                                  <option value="asc">
                                    Más antiguas primero
                                  </option>
                                </select>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-600">
                                  Filtrar por estado:
                                </span>
                                <select
                                  value={filterState}
                                  onChange={(e) =>
                                    setFilterState(e.target.value)
                                  }
                                  className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="all">Todos</option>
                                  <option value="En Proceso">En Proceso</option>
                                  <option value="Completado">Completado</option>
                                </select>
                              </div>
                            </div>
                            <div
                              ref={containerRef}
                              className="flex w-full overflow-x-auto items-start gap-12 px-12 py-[12px] relative scroll-smooth"
                            >
                              {/* Renderizado de requisiciones ordenadas */}
                              {[...request.requisitions]
                                .filter((req) =>
                                  filterState === "all"
                                    ? true
                                    : req.state === filterState
                                )
                                .sort((a, b) =>
                                  sortOrder === "asc"
                                    ? new Date(a.createdDate) -
                                      new Date(b.createdDate)
                                    : new Date(b.createdDate) -
                                      new Date(a.createdDate)
                                )
                                .map((req, idx) => (
                                  <div
                                    key={req.id}
                                    className="flex-shrink-0 min-w-[24rem] relative flex flex-col items-center z-10 cursor-pointer"
                                  >
                                    {/* Punto y fecha */}
                                    <div className="flex flex-col items-center mb-4 relative">
                                      <p className="text-sm text-gray-500 mb-1">
                                        {new Date(
                                          req.createdDate
                                        ).toLocaleString()}
                                      </p>
                                      <div
                                        className={`h-4 w-4 rounded-full border-2 border-white shadow-md z-10 ${
                                          idx === 0
                                            ? "bg-black"
                                            : "bg-slate-500"
                                        }`}
                                      ></div>
                                      {idx === 0 && (
                                        <div className="w-0.5 h-6 bg-black absolute top-full"></div>
                                      )}
                                    </div>

                                    {/* Card principal */}
                                    <div
                                      className={`bg-white border rounded-lg ${
                                        idx === 0 ? "shadow-md" : ""
                                      } p-6 w-full hover:shadow-lg transition-shadow`}
                                      onClick={() => {
                                        navigate("/newRequisition", {
                                          state: {
                                            request: request,
                                            requisition: req,
                                            hasPrevRequisition: request
                                              ?.requisitions[idx + 1]
                                              ? true
                                              : false,
                                            prevRequisition:
                                              request.requisitions.length > 1
                                                ? request.requisitions[idx + 1]
                                                : null,
                                            action: "update",
                                          },
                                        });
                                      }}
                                    >
                                      <div className="flex justify-between items-center mb-2">
                                        <p
                                          className={`text-black font-bold py-1 px-2 rounded-full text-xs ${
                                            getRequisitionStateName(
                                              req.state
                                            ) === "Completada"
                                              ? "bg-green-400"
                                              : "bg-gray-400"
                                          }`}
                                        >
                                          {getRequisitionStateName(req.state)}
                                        </p>

                                        {/* Botón Ver Detalles */}
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedRequisition(req);
                                            setIsModalOpen(true);
                                          }}
                                          className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-all shadow-sm"
                                        >
                                          Ver Detalles
                                        </button>
                                      </div>

                                      <h3 className="font-semibold text-xl mb-1">
                                        Requisición {req.id}
                                      </h3>
                                      <p className="text-gray-600 text-sm ">
                                        {req.requestType
                                          ? req.requestType.name
                                          : "Por definir"}
                                      </p>

                                      {req?.externalEmployee ? (
                                        <p className="text-gray-600 text-sm ">
                                          {req?.externalEmployee?.fullname &&
                                            req.state === "Completado" &&
                                            `Empleado: ${req?.externalEmployee?.fullname}`}
                                        </p>
                                      ) : (
                                        <p className="text-gray-600 text-sm ">
                                          {req?.infoEmpleadoAkilesDto?.nombre &&
                                            req.state === "Completado" &&
                                            `Empleado: ${req?.infoEmpleadoAkilesDto?.nombre}`}
                                        </p>
                                      )}

                                      <p className="text-gray-600 text-sm ">
                                        {req?.infoEmpleadoAkilesDto &&
                                          `Departamento: ${req?.infoEmpleadoAkilesDto?.descrip_Departamento}`}
                                      </p>
                                      <p className="text-gray-600 mb-4">
                                        {req.details}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No se encontraron requisiciones.
                      </p>
                    </div>
                  )
                ) : (
                  !requestIsPending && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        Error al cargar las requisiciones.
                      </p>
                    </div>
                  )
                )}
              </>
            ) : (
              <RequisitionSkn count={1} />
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
        {/* Paginación y resumen */}
      </div>
    </Layout>
  );
}

export default Requisitions;
