import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
  faSyncAlt,
  faChevronLeft,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useApiGet } from "../../../api/config/customHooks";
import { getRequestsFromRequestRoleFlow } from "../../../api/urls/RequestRoleFlow";
import RequestRoleSkn from "../../../components/Skeleton/RequestRoleSkn";
import { formatIsoDateToYYYYMMDD } from "../../../utils/dateFormat";

// Componente de paginación simple para el sidebar
const SidebarPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-3 border-t border-gray-200 dark:border-gray-700 mt-4 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Página anterior"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>

      <div className="flex items-center space-x-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {currentPage} de {totalPages}
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Página siguiente"
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
};

// Componente de configuración de paginación colapsable
const PaginationSettings = ({
  pageSize,
  onPageSizeChange,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 mt-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <span>Configuración</span>
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          size="sm"
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 pb-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-500 dark:text-gray-400">
              Por página:
            </label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinanceSidebar = ({ onParentSelect, setChildRequestsData }) => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const {
    data: requestData,
    isFetching,
    refetch,
    isSuccess,
  } = useApiGet(
    ["GetRequestsFromRequestRoleFlow", currentPage, pageSize],
    () => getRequestsFromRequestRoleFlow(5, currentPage, pageSize),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    }
  );

  const handleRefresh = async () => {
    try {
      console.log("Refrescar solicitudes...");
      await refetch();
      setSelectedParentId(null);
      setChildRequestsData([]);
    } catch (error) {
      console.error("Error al refrescar:", error);
    }
  };

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  // Handlers para paginación
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  // Cálculo de páginas totales
  const totalPages = requestData
    ? Math.ceil(requestData.totalRecords / requestData.pageSize)
    : 0;

  useEffect(() => {
    if (isSuccess && !isFetching && requestData) {
      const timer = setTimeout(() => {
        setShowRequests(true);
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setShowRequests(false);
    }
  }, [isSuccess, isFetching, requestData]);

  const handleParentClick = (parentId, requisitions) => {
    setSelectedParentId(parentId);
    onParentSelect(parentId);
    setChildRequestsData(requisitions);
  };

  // Información de paginación
  const startRecord = requestData ? (currentPage - 1) * pageSize + 1 : 0;
  const endRecord = requestData
    ? Math.min(currentPage * pageSize, requestData.totalRecords)
    : 0;
  const totalRecords = requestData ? requestData.totalRecords : 0;

  return (
    <div className="bg-white/30 dark:bg-gray-900/40   backdrop-blur-md shadow-lg p-5 w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          Solicitudes
        </h2>
        <button
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-95"
          title="Refrescar Solicitudes"
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" />
        </button>
      </div>

      {/* Información de paginación */}
      {requestData && totalRecords > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 px-1">
          Mostrando {startRecord}-{endRecord} de {totalRecords}
        </div>
      )}

      {/* Lista de solicitudes */}
      <nav className="flex-grow">
        <ul>
          {isFetching ? (
            <RequestRoleSkn />
          ) : requestData && requestData.data && requestData.data.length > 0 ? (
            requestData.data.map((parent, index) => (
              <li
                key={parent.id}
                className={`mb-1 transition-all duration-300 transform ease-out ${
                  showRequests
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: showRequests ? `${index * 50}ms` : "0ms",
                }}
              >
                <div
                  className={`relative flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 group
                    ${
                      selectedParentId === parent.id
                        ? "bg-blue-500 text-white shadow-md"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                    }`}
                  onClick={() =>
                    handleParentClick(parent.id, parent.requisitions)
                  }
                >
                  {/* Indicador de "Nuevo" o "Actualizado" */}
                  {(parent.isNew || parent.hasUpdate) && (
                    <span
                      className={`absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full
                        ${parent.isNew ? "bg-red-500" : "bg-yellow-500"}`}
                      title={
                        parent.isNew
                          ? "Nueva solicitud"
                          : "Solicitud actualizada"
                      }
                    ></span>
                  )}

                  <div className="flex flex-col flex-grow truncate">
                    <span
                      className={`font-semibold text-base truncate ${
                        selectedParentId === parent.id
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {parent.displayId || parent.id}
                    </span>
                    <span
                      className={`text-xs ${
                        selectedParentId === parent.id
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {formatIsoDateToYYYYMMDD(parent.createdDate)}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={
                      selectedParentId === parent.id
                        ? faChevronRight
                        : faChevronDown
                    }
                    className={`ml-3 text-sm transition-transform duration-200
                      ${
                        selectedParentId === parent.id
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                      }`}
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              No hay solicitudes disponibles.
            </p>
          )}
        </ul>
      </nav>

      {/* Controles de paginación */}
      <div className="mt-auto">
        <SidebarPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isFetching}
        />

        <PaginationSettings
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          isExpanded={settingsExpanded}
          onToggle={() => setSettingsExpanded(!settingsExpanded)}
        />
      </div>
    </div>
  );
};

export default FinanceSidebar;
