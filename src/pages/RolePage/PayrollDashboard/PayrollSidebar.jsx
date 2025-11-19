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
    </div>
  );
};

// -----------------------------------------------------------------------------
// SIDEBAR PRINCIPAL
// -----------------------------------------------------------------------------
export default function PayrollSidebar({
  onParentSelect,
  setChildRequestsData,
}) {
  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  // FILTERS (desplegable)
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filters, setFilters] = useState({
    requestId: "",
    leader: "",
    startDate: "",
    endDate: "",
  });

  const activeFilterCount = Object.values(filters).filter((x) => x).length;

  // API
  const {
    data: requestData,
    isFetching,
    refetch,
    isSuccess,
  } = useApiGet(
    ["GetRequestsFromRequestRoleFlowPayroll", currentPage, pageSize],
    () => getRequestsFromRequestRoleFlow(6, currentPage, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const handleRefresh = async () => {
    await refetch();
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  // ANIMACIÓN
  useEffect(() => {
    if (isSuccess && !isFetching && requestData) {
      const timer = setTimeout(() => setShowRequests(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowRequests(false);
    }
  }, [isSuccess, isFetching, requestData]);

  // PAGINACIÓN
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

  const totalPages = requestData
    ? Math.ceil(requestData.totalRecords / requestData.pageSize)
    : 0;

  // ---------------------------------------------------------------------------
  // FILTRO REAL SOBRE LA DATA DEL BACKEND
  // ---------------------------------------------------------------------------
  const filteredRequests =
    requestData?.data?.filter((item) => {
      const reqIdMatch = filters.requestId
        ? item.displayId?.toString().includes(filters.requestId)
        : true;

      const leaderMatch = filters.leader
        ? item.user?.name?.toLowerCase().includes(filters.leader.toLowerCase())
        : true;

      const created = new Date(item.createdDate);

      const startMatch = filters.startDate
        ? created >= new Date(filters.startDate)
        : true;

      const endMatch = filters.endDate
        ? created <= new Date(filters.endDate)
        : true;

      return reqIdMatch && leaderMatch && startMatch && endMatch;
    }) || [];

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-md shadow-lg p-5 w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Solicitudes
        </h2>

        <button
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" />
        </button>
      </div>

      {/* ---------------- FILTROS DESPLEGABLE ---------------- */}
      <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white/40 dark:bg-gray-800/40">
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Filtros</span>

          {activeFilterCount > 0 && (
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}

          <FontAwesomeIcon
            icon={filtersExpanded ? faChevronUp : faChevronDown}
            size="sm"
          />
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            filtersExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 space-y-3">
            <input
              type="text"
              placeholder="ID de solicitud"
              value={filters.requestId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, requestId: e.target.value }))
              }
              className="w-full p-2 rounded-md text-sm border bg-white dark:bg-gray-900"
            />

            <input
              type="text"
              placeholder="Líder de equipo"
              value={filters.leader}
              onChange={(e) =>
                setFilters((f) => ({ ...f, leader: e.target.value }))
              }
              className="w-full p-2 rounded-md text-sm border bg-white dark:bg-gray-900"
            />

            <div className="flex flex-col">
              <label className="text-xs mb-1">Fecha inicio</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, startDate: e.target.value }))
                }
                className="p-2 rounded-md text-sm border bg-white dark:bg-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs mb-1">Fecha fin</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, endDate: e.target.value }))
                }
                className="p-2 rounded-md text-sm border bg-white dark:bg-gray-900"
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
              className="w-full py-2 text-sm bg-gray-400 hover:bg-gray-500 text-white rounded-md"
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
                  showRequests ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div
                  className={`relative flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer
                    ${
                      selectedParentId === parent.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  onClick={() => {
                    setSelectedParentId(parent.id);
                    onParentSelect(parent.id);
                    setChildRequestsData(parent.requisitions);
                  }}
                >
                  <div className="flex flex-col flex-grow truncate">
                    <span className="font-semibold text-base truncate">
                      {parent.displayId || parent.id}
                    </span>

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
                    className="ml-3"
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
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
