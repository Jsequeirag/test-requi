import React from "react";

// Individual row skeleton for the table
const HeaderTableSearch = () => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {/* ID empleado */}
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
      </td>
      {/* Nombre */}
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
      </td>
      {/* Descripción Departamento */}
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28 animate-pulse"></div>
      </td>
      {/* Descripción Puesto */}
      <td className="py-3 px-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
      </td>
      {/* Asignar/designar departamento (Icono) */}
      <td className="py-3 px-4 text-right">
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse ml-auto"></div>
      </td>
    </tr>
  );
};

// Main table skeleton component
const UserTableSkeleton = ({ rowCount = 9 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      {/* Table Header Skeleton */}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-28"></div>
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 ml-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: rowCount }, (_, index) => (
            <HeaderTableSearch key={index} />
          ))}
        </tbody>
      </table>

      {/* Pagination Skeleton */}
      <div className="px-4 py-3 flex items-center justify-end border-t border-gray-200 dark:border-gray-700">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse mr-3"></div>
        <div className="flex space-x-2">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export { UserTableSkeleton, HeaderTableSearch };
