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

// -----------------------------------------------------------------------------
// PAGINACIÓN SIMPLE
// -----------------------------------------------------------------------------
const SidebarPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-3 border-t border-gray-200 dark:border-gray-700 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>

      <span className="text-xs text-gray-500 dark:text-gray-400">
        {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
};

// -----------------------------------------------------------------------------
// CONFIGURACIÓN DE PAGINACIÓN
// -----------------------------------------------------------------------------
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
        className="w-full flex items-center justify-between p-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <span>Configuración</span>
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          size="sm"
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 pb-3">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Por página:
          </label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// FINANCESIDEBAR PRINCIPAL
// -----------------------------------------------------------------------------
export default function FinanceSidebar({
  onParentSelect,
  setChildRequestsData,
}) {
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  // ======== FILTROS ========
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filters, setFilters] = useState({
    requestId: "",
    leader: "",
    startDate: "",
    endDate: "",
  });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  // API call (ROLE: FINANCE = 5)
  const {
    data: requestData,
    isFetching,
    refetch,
    isSuccess,
  } = useApiGet(
    ["FinanceSidebarData", currentPage, pageSize],
    () => getRequestsFromRequestRoleFlow(5, currentPage, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  // Animación en la entrada de elementos
  useEffect(() => {
    if (isSuccess && !isFetching && requestData) {
      const t = setTimeout(() => setShowRequests(true), 50);
      return () => clearTimeout(t);
    } else setShowRequests(false);
  }, [isSuccess, isFetching, requestData]);

  const handleRefresh = async () => {
    await refetch();
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const handlePageChange = (n) => {
    setCurrentPage(n);
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const handlePageSizeChange = (n) => {
    setPageSize(n);
    setCurrentPage(1);
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const totalPages = requestData
    ? Math.ceil(requestData.totalRecords / requestData.pageSize)
    : 0;

  // -------------------------------------------------------------------------
  // FILTRADO REAL DE LA DATA
  // -------------------------------------------------------------------------
  const filteredRequests =
    requestData?.data?.filter((parent) => {
      // ---------------------------------------
      // FILTRO 1: ID de solicitud (displayId o id)
      // ---------------------------------------
      const requestIdMatch = filters.requestId
        ? parent.displayId?.toString() === filters.requestId ||
          parent.id?.toString() === filters.requestId
        : true;

      // ---------------------------------------
      // FILTRO 2: ID de requisición interna
      // ---------------------------------------
      const requisitionIdMatch = filters.requestId
        ? parent.requisitions?.some(
            (req) => req.id?.toString() === filters.requestId
          )
        : true;

      // Solicitud coincide si coincide por solicitud o por requisición
      const requestOrRequisitionMatch = requestIdMatch || requisitionIdMatch;

      // ---------------------------------------
      // FILTRO 3: Líder (por nombre o por ID)
      // ---------------------------------------
      const leaderMatch = filters.leader
        ? parent.user?.id?.toString() === filters.leader ||
          parent.user?.name
            ?.toLowerCase()
            .includes(filters.leader.toLowerCase())
        : true;

      // ---------------------------------------
      // FILTRO 4: Rango de fechas
      // ---------------------------------------
      const createdDate = new Date(parent.createdDate);

      const startMatch = filters.startDate
        ? createdDate >= new Date(filters.startDate)
        : true;

      const endMatch = filters.endDate
        ? createdDate <= new Date(filters.endDate)
        : true;

      // ---------------------------------------
      // Resultado final
      // ---------------------------------------
      return requestOrRequisitionMatch && leaderMatch && startMatch && endMatch;
    }) || [];
  // -------------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------------
  return (
    <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-md shadow-lg p-5 w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Solicitudes
        </h2>
        <button
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" />
        </button>
      </div>

      {/* ---------------- FILTROS DESPLEGABLE ---------------- */}
      <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white/40 dark:bg-gray-800/40">
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="flex justify-between items-center w-full px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Filtros</span>

          {activeFilterCount > 0 && (
            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}

          <FontAwesomeIcon
            icon={filtersExpanded ? faChevronUp : faChevronDown}
          />
        </button>

        {/* Contenido del Filtro */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            filtersExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="ID de Solicitud/Requisición"
              value={filters.requestId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, requestId: e.target.value }))
              }
              className="p-2 text-sm border rounded-md bg-white dark:bg-gray-900"
            />

            <input
              type="text"
              placeholder="Líder"
              value={filters.leader}
              onChange={(e) =>
                setFilters((f) => ({ ...f, leader: e.target.value }))
              }
              className="p-2 text-sm border rounded-md bg-white dark:bg-gray-900"
            />

            <div>
              <label className="text-xs text-gray-500">Fecha inicio</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, startDate: e.target.value }))
                }
                className="w-full p-2 text-sm border rounded-md bg-white dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Fecha fin</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, endDate: e.target.value }))
                }
                className="w-full p-2 text-sm border rounded-md bg-white dark:bg-gray-900"
              />
            </div>

            <button
              onClick={() =>
                setFilters({
                  requestId: "",
                  leader: "",
                  startDate: "",
                  endDate: "",
                })
              }
              className="py-2 text-sm bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- LISTA ---------------- */}
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {isFetching ? (
            <RequestRoleSkn />
          ) : filteredRequests.length > 0 ? (
            filteredRequests.map((parent, index) => (
              <li
                key={parent.id}
                className={`mb-1 transition-all duration-300 ${
                  showRequests
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div
                  onClick={() => {
                    setSelectedParentId(parent.id);
                    onParentSelect(parent.id);
                    setChildRequestsData(parent.requisitions);
                  }}
                  className={`relative flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer ${
                    selectedParentId === parent.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex flex-col flex-grow truncate">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {parent.displayId || parent.id}
                      </span>
                      <span>{parent.state}</span>
                    </div>
                    <span className="text-xs">
                      {formatIsoDateToYYYYMMDD(parent.createdDate)}
                    </span>
                    <span className="font-bold text-xs">
                      {parent.user?.name}
                    </span>
                  </div>

                  <FontAwesomeIcon
                    icon={
                      selectedParentId === parent.id
                        ? faChevronRight
                        : faChevronDown
                    }
                    className="ml-3 text-sm"
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              No hay solicitudes que coincidan con los filtros.
            </p>
          )}
        </ul>
      </nav>

      {/* ---------------- PAGINACIÓN ---------------- */}
      <div className="mt-4">
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
}
