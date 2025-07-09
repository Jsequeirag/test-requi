import React from "react";

// Componente individual de skeleton
const ListItemSkeleton = () => {
  return (
    <li className="mb-2">
      <div className="relative flex items-center justify-between py-2 px-3 rounded-md animate-pulse">
        <div className="flex flex-col space-y-2 flex-1">
          {/* Skeleton para displayId */}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          {/* Skeleton para fecha */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        {/* Skeleton para el icono */}
        <div className="ml-2 w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </li>
  );
};

// Componente principal con múltiples items
const RequestRoleSkn = ({ itemCount = 10 }) => {
  return (
    <ul className="space-y-0">
      {Array.from({ length: itemCount }, (_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </ul>
  );
};

// Versión con diferentes anchos para más realismo
const RealisticListSkeleton = ({ itemCount = 5 }) => {
  const widths = ["w-20", "w-24", "w-28", "w-32", "w-16"];
  const dateWidths = ["w-14", "w-16", "w-18"];

  return (
    <ul className="space-y-0">
      {Array.from({ length: itemCount }, (_, index) => (
        <li key={index} className="mb-2">
          <div className="relative flex items-center justify-between py-2 px-3 rounded-md animate-pulse">
            <div className="flex flex-col space-y-2 flex-1">
              {/* Skeleton para displayId con ancho variable */}
              <div
                className={`h-4 bg-gray-300 dark:bg-gray-600 rounded ${
                  widths[index % widths.length]
                }`}
              ></div>
              {/* Skeleton para fecha con ancho variable */}
              <div
                className={`h-3 bg-gray-200 dark:bg-gray-700 rounded ${
                  dateWidths[index % dateWidths.length]
                }`}
              ></div>
            </div>
            {/* Skeleton para el icono */}
            <div className="ml-2 w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Skeleton con efecto de onda (wave effect)
const WaveListSkeleton = ({ itemCount = 5 }) => {
  return (
    <ul className="space-y-0">
      {Array.from({ length: itemCount }, (_, index) => (
        <li key={index} className="mb-2">
          <div className="relative flex items-center justify-between py-2 px-3 rounded-md">
            <div className="flex flex-col space-y-2 flex-1">
              {/* Skeleton con gradiente animado */}
              <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded w-24 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded w-16 animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
            </div>
            <div className="ml-2 w-4 h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600 rounded animate-pulse bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Uso en tu componente
const ExampleUsage = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  // Simular carga de datos
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData([
        /* tus datos reales */
      ]);
    }, 2000);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Requisiciones</h2>

      {loading ? (
        <RealisticListSkeleton itemCount={6} />
      ) : (
        <ul>{/* Tu lista real aquí */}</ul>
      )}
    </div>
  );
};

export {
  RequestRoleSkn,
  RealisticListSkeleton,
  WaveListSkeleton,
  ListItemSkeleton,
};
export default RequestRoleSkn;
