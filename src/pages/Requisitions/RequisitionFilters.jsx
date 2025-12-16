import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

const RequisitionFilters = ({
  filters,
  onChange,
  onReset,
  onSearch,
  showSearchButton = false,
}) => {
  return (
    <div className="flex items-center space-x-3 m-4">
      {/* Estado */}
      <select
        name="state"
        value={filters.state}
        onChange={(e) => onChange({ ...filters, state: e.target.value })}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos los estados</option>
        <option value="0">En proceso</option>
        <option value="1">Completado</option>
      </select>

      {/* ID */}
      <input
        type="text"
        name="id"
        placeholder="ID de Solicitud/Requisición"
        value={filters.requestId}
        onChange={(e) => onChange({ ...filters, requestId: e.target.value })}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px]"
      />

      {/* Fecha Inicio */}
      <input
        type="datetime-local"
        name="startDate"
        value={filters.startDate}
        onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Fecha Fin */}
      <input
        type="datetime-local"
        name="endDate"
        value={filters.endDate}
        onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Botón Buscar (opcional) */}
      {showSearchButton && (
        <button
          onClick={onSearch}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" /> Buscar
        </button>
      )}

      {/* Botón Reset */}
      <button
        onClick={onReset}
        className="flex items-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="mr-2" /> Limpiar
      </button>
    </div>
  );
};

export default RequisitionFilters;
