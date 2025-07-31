import { useEffect, useState } from "react"; // `React` y `useReducer` no son necesarios si no se usan directamente
import formStore from "../../../../stores/FormStore";
import { useApiGet } from "../../../api/config/customHooks";
import { getEmployeeById } from "../../../api/urls/Employee";
import { formatIsoDateToYYYYMMDD } from "../../../utils/dateFormat.js";
import { getLocalStorageKeyValue } from "../../../utils/localstore";
import { Info } from "lucide-react"; // Importa el icono Info
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx"; // Asegúrate de que el nombre sea correcto
export default function EmployeeInfo() {
  const formValues = formStore((state) => state.formValues);
  const employeeSelected = formStore((state) => state.employeeSelected);
  const setEmployeeSelected = formStore((state) => state.setEmployeeSelected);

  const employeeId = getLocalStorageKeyValue(
    "requitool-employeeInfo",
    "employeeId"
  );

  const { data: employeeData, isLoading } = useApiGet(
    ["employeeById", formValues?.employeeId],
    () => getEmployeeById(formValues?.employeeId),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!formValues?.employeeId, // Habilita la llamada solo si hay un employeeId
    }
  );

  useEffect(() => {
    if (formValues?.employeeId) {
      if (!isLoading && employeeData) {
        // console.log(employeeData); // Puedes descomentar si necesitas ver los datos en consola
        setEmployeeSelected(employeeData);
      }
    } else {
      // Si no hay un ID de empleado seleccionado, reseteamos el estado
      setEmployeeSelected({});
    }
  }, [formValues?.employeeId, isLoading, employeeData, setEmployeeSelected]); // Añadir employeeData y setEmployeeSelected a las dependencias

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Información de Empleado
      </h1>

      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se configura para 1 columna en móvil, 2 en pantallas medianas (md) y 3 en pantallas grandes (lg) */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Campo 1: Nombre */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="employeeId"
          >
            Nombre{" "}
            <span className="text-red-500 font-bold">
              {/*Si es promocion no se debe mostrar el */}
              {formValues?.requestTypeId === 3 ? "" : "*"}
            </span>
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getEmployeesByDepartmentAndBoss/${employeeId}`}
            name={"employeeId"}
            customNameParam="nombre"
            //para promocion no debe ser obligatorio
            required={formValues?.requestTypeId === 3 ? false : true}
            value={formValues?.employeeId || ""}
            className="w-full text-base"
          />
          {/*si es promocion no activarlo*/}
          {formValues?.requestTypeId !== 3 && (
            <p className="mt-1 text-xs text-red-600 flex items-center dark:text-red-500">
              <Info className="w-3 h-3 mr-1" /> Este campo es requerido.
            </p>
          )}
        </div>

        {/* Campo 2: Exactus ID */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="idExactus"
          >
            Exactus ID
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            disabled
            id="idExactus"
            type="text"
            name="idExactus"
            value={employeeSelected?.id || ""}
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>

        {/* Campo 3: # Código de Posición */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="posCod"
          >
            # Código de Posición
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            disabled
            id="posCod" // ID corregido
            type="text"
            name="posCod" // Name corregido
            value={"54321"}
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>

        {/* Campo 4: Supervisor */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="supervisor"
          >
            Supervisor
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            id="supervisor" // ID corregido
            type="text"
            name="supervisor" // Name corregido
            disabled
            value={employeeSelected?.nombre_Supervisor || ""}
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>

        {/* Campo 5: Grado */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="grado"
          >
            Grado
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            disabled
            id="grado" // ID corregido
            type="text"
            name="grado" // Name corregido
            value={employeeSelected?.grado || ""}
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>

        {/* Campo 6: Proyecto */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="proyecto"
          >
            Proyecto
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            disabled
            id="proyecto" // ID corregido
            type="text"
            name="proyecto" // Name corregido
            value={"Proyecto A"}
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>

        {/* Campo 7: Fecha de Ingreso */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="fechaIngreso"
          >
            Fecha de Ingreso
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            disabled
            id="fechaIngreso" // ID corregido
            type="date"
            name="fechaIngreso" // Name corregido
            value={
              formatIsoDateToYYYYMMDD(employeeSelected?.fecha_Ingreso) || ""
            }
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>

        {/* Campo 8: Departamento */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="departamento"
          >
            Departamento
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
            disabled
            id="departamento" // ID corregido
            type="text"
            name="departamento" // Name corregido
            value={employeeSelected?.departamento || ""}
            autoComplete="off"
            // Se elimina onChange en inputs deshabilitados
          />
        </div>
      </div>
    </>
  );
}
