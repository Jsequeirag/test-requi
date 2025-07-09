import React, { useEffect, useState, useRef } from "react";

import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../components/Button/Button";
import TextButton from "../../components/Button/TextButton";
import formStore from "../../../stores/FormStore.js";
import {
  faPlusCircle,
  faFilter,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApiGet } from "../../api/config/customHooks";
import { getRequestByUserId } from "../../api/urls/Request";
import { getLocalStorageKeyValue } from "../../utils/localstore";
import RequisitionSkn from "../../components/Skeleton/RequisitionSkn.jsx";
// Componente de paginación
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
    <div className="flex items-center justify-between bg-white px-4 py-3 border-t">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Mostrar</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-sm text-gray-700">por página</span>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
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
            {page}
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

function Requisitions() {
  const employeeLoggedDeparment = getLocalStorageKeyValue(
    "requitool-employeeInfo",
    "descripDepartamento"
  );

  //global
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const {
    data: requestData,
    isSuccess: requestIsSuccess,
    isPending: requestIsPending,
    refetch: refetchRequests,
  } = useApiGet(
    ["RequestByUser", currentPage, pageSize],
    () =>
      getRequestByUserId(
        getLocalStorageKeyValue("requitool-employeeInfo", "id"),
        currentPage,
        pageSize
      ),
    {
      enabled: true,
      keepPreviousData: true, // Mantiene datos previos mientras carga nuevos
    }
  );

  const [expandedRequest, setExpandedRequest] = useState(null);
  const [requi, setRequi] = useState({});
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Handlers para paginación
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setExpandedRequest(null); // Colapsa elementos expandidos al cambiar página
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Resetea a página 1 cuando cambia el tamaño
    setExpandedRequest(null);
  };

  // Cálculo de páginas totales
  const totalPages = requestData
    ? Math.ceil(requestData.totalRecords / requestData.pageSize)
    : 0;

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const setRequestStatus = (statusId) => {
    return statusId === 0 ? "En proceso" : "Completado";
  };

  // Información de paginación para mostrar
  const startRecord = requestData ? (currentPage - 1) * pageSize + 1 : 0;
  const endRecord = requestData
    ? Math.min(currentPage * pageSize, requestData.totalRecords)
    : 0;
  const totalRecords = requestData ? requestData.totalRecords : 0;

  return (
    <Layout>
      <div className="m-4 ">
        <div className="border-b bg-white rounded-sm h-full">
          <div className="flex items-center border-b p-4 mx-2 justify-between">
            <div className="flex items-center p-4 mx-2">
              <a
                href="/home"
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

            <div className="flex items-center space-x-3">
              <IconButton
                bgColor="bg-gray-500 hover:bg-gray-600"
                icon={faFilter}
                onClick={() => navigate("/priceListform")}
              />
              <IconButton
                bgColor="bg-blue-500 hover:bg-blue-600"
                icon={faPlusCircle}
                onClick={() => navigate("/priceListform")}
              />
            </div>
          </div>

          {/* Información de paginación */}
          {requestIsSuccess && requestData && (
            <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
              <div>
                Mostrando {startRecord} a {endRecord} de {totalRecords}{" "}
                requisiciones
              </div>
              <div>
                Página {currentPage} de {totalPages}
              </div>
            </div>
          )}

          {/* Contenedor principal de las requisiciones */}
          <div className="space-y-4 p-4">
            {!requestIsPending ? (
              <>
                {requestIsSuccess && requestData && requestData.data ? (
                  requestData.data.length > 0 ? (
                    requestData.data.map((request, index) => (
                      <div key={request.id} className="border rounded-md">
                        {/* Header de la requisición - siempre visible */}
                        <div className="flex items-center bg-slate-50 p-4 rounded-md justify-between">
                          <p>
                            <strong>Solicitud:</strong> {request.id}
                          </p>
                          <span
                            className={`p-2 rounded-md font-semibold text-black ${
                              request.state === "pendiente"
                                ? "bg-yellow-400"
                                : "bg-blue-400"
                            }`}
                          >
                            {request.state}
                          </span>
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

                        {/* Contenido expandible con animación */}
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

                            <div
                              ref={containerRef}
                              className="flex w-full overflow-x-auto items-start gap-12 px-12 py-[12px] relative scroll-smooth"
                            >
                              {request.requisitions.map((req, idx) => (
                                <div
                                  key={req.id}
                                  className="flex-shrink-0 min-w-[24rem] relative flex flex-col items-center z-10"
                                >
                                  {/* Punto */}
                                  <div className="flex flex-col items-center mb-4 relative">
                                    {/* Fecha */}
                                    <p className="text-sm text-gray-500 mb-1">
                                      {new Date(
                                        req.createdDate
                                      ).toLocaleString()}
                                    </p>

                                    {/* Punto */}
                                    <div
                                      className={`h-4 w-4 rounded-full border-2 border-white shadow-md z-10 ${
                                        idx === 0 ? "bg-black" : "bg-slate-500"
                                      }`}
                                    ></div>

                                    {/* Línea vertical solo en el primero */}
                                    {idx === 0 && (
                                      <div className="w-0.5 h-6 bg-black absolute top-full"></div>
                                    )}
                                  </div>
                                  {/* Card */}
                                  <div
                                    className={`bg-white border rounded-lg ${
                                      idx === 0 ? "shadow-md" : ""
                                    } p-6 w-full hover:shadow-lg transition-shadow ${
                                      req?.infoEmpleadoAkilesDto
                                        ?.descrip_Departamento ===
                                      employeeLoggedDeparment
                                        ? "cursor-pointer"
                                        : "cursor-not-allowed"
                                    }`}
                                    //si el usuario logueado el del mismo departamento del empleado asociado a la Requisición
                                    onClick={() => {
                                      if (
                                        req?.infoEmpleadoAkilesDto
                                          ?.descrip_Departamento ===
                                        employeeLoggedDeparment
                                      ) {
                                        setFormValues(req);
                                        navigate("/newRequisition", {
                                          state: {
                                            requisition: req,
                                            action: "update",
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    <div className="flex">
                                      <p className="text-gray-600 text-sm font-bold py-1 mr-2">
                                        {req.state === "Pendiente" &&
                                          "Finanzas"}
                                      </p>
                                      <p
                                        className={`text-black font-bold py-1 px-2 rounded-full text-xs ${
                                          req.state === "Pendiente"
                                            ? "bg-yellow-400"
                                            : "bg-blue-400"
                                        }`}
                                      >
                                        {req.state}
                                      </p>
                                    </div>
                                    <h3 className="font-semibold text-xl mb-1">
                                      Requisición {req.id}
                                    </h3>
                                    <p className="text-gray-600 text-sm ">
                                      {req.requestType
                                        ? `${req.requestType.name}  `
                                        : "Por definir"}
                                    </p>
                                    <p className="text-gray-600 text-sm ">
                                      {req?.infoEmpleadoAkilesDto?.nombre &&
                                        `Empleado: ${req?.infoEmpleadoAkilesDto?.nombre}`}
                                    </p>
                                    <p className="text-gray-600 text-sm ">
                                      {req?.infoEmpleadoAkilesDto &&
                                        `Departamento:
                                      ${req?.infoEmpleadoAkilesDto?.descrip_Departamento}`}
                                    </p>{" "}
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

          {/* Componente de paginación */}
          {requestIsSuccess && requestData && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Requisitions;
