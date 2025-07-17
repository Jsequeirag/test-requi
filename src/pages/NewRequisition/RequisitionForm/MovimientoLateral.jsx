import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
// RMovimientoLateral está importado pero no se usa en este componente.
// Si no se usa en el renderizado o lógica de MovimientoLateral, puedes considerar quitarlo.
// import RMovimientoLateral from "../RequisitionDetail/RDetailMovimientoLateral.jsx";

export default function MovimientoLateral() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  //API - Keeping the call as formValues?.requestTypeId is used in AsyncSelect URL
  // but removing unused destructured variables if they are not consumed within this component's render or logic.
  useApiGet(["RequestType"], getRequestType);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Movimiento Lateral
      </h1>

      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se asegura 1 columna en móvil, 2 en mediano y 3 en grande */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Campo 1: Motivo */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="motivo" // ID corregido y único
          >
            Motivo <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}`}
            name={"requisitionTypeId"}
            id={"motivo"} // Añadido ID
            value={formValues?.requisitionTypeId || ""} // Usamos 'value' y un fallback a ""
            className="w-full text-base"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>
        {/* Campo 2: Fecha Oficial del Movimiento */}
        {/* Eliminado el div `flex` anidado innecesario */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="movementOfficialDate" // ID corregido y más descriptivo
          >
            Fecha Oficial del Movimiento <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            id="movementOfficialDate" // ID corregido
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="date"
            name="createdDate" // Nombre del campo en formValues
            placeholder="Fecha oficial del Movimiento"
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={
              formValues.createdDate ? formValues.createdDate.split("T")[0] : ""
            }
          />
        </div>{" "}
        {/* Campo 3: Comentario (ocupará 1 columna como los demás, ya que hay espacio) */}
        <div className="lg:col-span-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="comment" // ID corregido y único
          >
            Comentario
          </label>
          <textarea
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400 h-[200px]"
            placeholder="Comentario"
            name="comment"
            id="comment" // Añadido ID
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={formValues.comment || ""}
          />
        </div>
      </div>
    </>
  );
}
