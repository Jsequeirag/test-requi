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

// ---------------------------------------------------------
// SIDEBAR PAGINATION
// ---------------------------------------------------------
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
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </button>

      <span className="text-xs text-gray-500 dark:text-gray-400">
        {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </button>
    </div>
  );
};

// ---------------------------------------------------------
// PAGINATION SETTINGS
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------
export default function RecluitmentSidebar({
  onParentSelect,
  setChildRequestsData,
}) {
  // -------------------------------
  // PAGINATION STATES
  // -------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  // -------------------------------
  // FILTER STATES
  // -------------------------------
  const [filters, setFilters] = useState({
    requestId: "",
    startDate: "",
    endDate: "",
    leader: "",
  });

  // -------------------------------
  // API CALL
  // -------------------------------
  const {
    data: requestData,
    isFetching,
    refetch,
    isSuccess,
  } = useApiGet(
    ["GetRequestsFromRequestRoleFlow", currentPage, pageSize],
    () => getRequestsFromRequestRoleFlow(2, currentPage, pageSize),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  // -------------------------------
  // REFRESH
  // -------------------------------
  const handleRefresh = async () => {
    await refetch();
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [showRequests, setShowRequests] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    setSelectedParentId(null);
    setChildRequestsData([]);
  };

  const totalPages = requestData
    ? Math.ceil(requestData.totalRecords / requestData.pageSize)
    : 0;

  useEffect(() => {
    if (isSuccess && !isFetching && requestData) {
      const t = setTimeout(() => setShowRequests(true), 50);
      return () => clearTimeout(t);
    } else setShowRequests(false);
  }, [isSuccess, isFetching, requestData]);

  // -------------------------------
  // FILTER LOGIC (FE prototype)
  // -------------------------------
  const filteredRequests =
    requestData?.data?.filter((parent) => {
      const reqIdMatch = filters.requestId
        ? parent.displayId?.toString().includes(filters.requestId)
        : true;

      const leaderMatch = filters.leader
        ? parent.leaderName
            ?.toLowerCase()
            .includes(filters.leader.toLowerCase())
        : true;

      const created = new Date(parent.createdDate);

      const startMatch = filters.startDate
        ? created >= new Date(filters.startDate)
        : true;

      const endMatch = filters.endDate
        ? created <= new Date(filters.endDate)
        : true;

      return reqIdMatch && leaderMatch && startMatch && endMatch;
    }) || [];

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-md shadow-lg p-5 w-72 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Solicitudes
        </h2>

        <button
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" />
        </button>
      </div>
      {/* === SEARCH DESPLEGABLE === */}
      <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
        {/* HEADER DEL FILTRO */}
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span>Filtros</span>
          <FontAwesomeIcon
            icon={filtersExpanded ? faChevronUp : faChevronDown}
            size="sm"
          />
        </button>

        {/* CONTENIDO DESPLEGABLE */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            filtersExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 space-y-3">
            {/* ID */}
            <input
              type="text"
              placeholder="ID de solicitud"
              value={filters.requestId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, requestId: e.target.value }))
              }
              className="w-full p-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* LIDER */}
            <input
              type="text"
              placeholder="Líder de equipo"
              value={filters.leader}
              onChange={(e) =>
                setFilters((f) => ({ ...f, leader: e.target.value }))
              }
              className="w-full p-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* FECHA INICIO */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Fecha inicio
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, startDate: e.target.value }))
                }
                className="p-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* FECHA FIN */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Fecha fin
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, endDate: e.target.value }))
                }
                className="p-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* LIMPIAR */}
            <button
              onClick={() =>
                setFilters({
                  requestId: "",
                  startDate: "",
                  endDate: "",
                  leader: "",
                })
              }
              className="w-full py-2 text-sm bg-gray-400 hover:bg-gray-500 text-white rounded-md transition"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------
            REQUEST LIST
      ---------------------------- */}
      <nav className="flex-grow">
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
                  </div>

                  <FontAwesomeIcon
                    icon={
                      selectedParentId === parent.id
                        ? faChevronRight
                        : faChevronDown
                    }
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

      {/* PAGINATION */}
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
}
