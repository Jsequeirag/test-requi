import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js"; // Se mantiene por si formValues.requestTypeId se setea externamente y se usa aquí
import AsyncSelectFreeText from "../../../components/AsyncComponents/AsyncSelectFreeText.jsx";
export default function CierrePlaza() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  // API - Asegúrate de que `getRequestType` sea necesario aquí.
  // Si `requestTypeData` no se usa directamente para renderizar un <select>
  // en este componente (que settee formValues.requestTypeId), entonces este
  // useApiGet podría ser redundante para este componente específico.
  // Por ahora, se mantiene la llamada, pero se omiten las variables no usadas.
  useApiGet(["RequestType"], getRequestType);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Cierre de Plaza
      </h1>

      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se asegura 1 columna en móvil, 2 en mediano y 3 en grande */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-2">
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
            url={`https://localhost:7040/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}/false`}
            name={"requisitionTypeId"}
            id={"motivo"} // Añadido ID
            value={formValues?.requisitionTypeId || ""} // Usamos 'value' y un fallback a ""
            className="w-full text-base"
            required={true} // Asumiendo que es requerido
          />
        </div>
        {/* Campo 2: Tipo de entregable */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="deliverableType" // ID corregido y único
          >
            Tipo de entregable <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getRequisitionFeature?requisitionFeatureId=5`}
            name={"deliverableType"}
            id={"deliverableType"} // Añadido ID
            value={formValues.deliverableType || ""} // Add this line
            className="w-full text-base"
            required={true} // Asumiendo que es requerido
          />
        </div>
        {/* Campo 3: Nombre de proyecto */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="project"
          >
            Proyecto
            {(formValues?.requisitionTypeId === 5 ||
              formValues?.requisitionTypeId === 12) && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <AsyncSelectFreeText
            url={`https://localhost:7040/GetProjectsByExactus`}
            name={"project"}
            id={"project"}
            value={formValues?.project || ""}
            className="w-full text-base"
            required={true}
            placeholder="Lista desplegable de los proyectos únicos de exactus"
            disabled={formValues.requisitionTypeId === 11}
          />
        </div>
        {/* Campo 4: R Form */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="rForm" // ID corregido y único
          >
            R Form <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            id="rForm"
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="text"
            name="rForm"
            placeholder="RForm"
            value={formValues.rForm || ""} // Asegúrate de que el valor se controle
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />
        </div>
        {/* Campo 5: Fecha Oficial del Ahorro */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="officialSavingDate" // ID corregido y único
          >
            Fecha Oficial del Ahorro <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            id="officialSavingDate"
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="date"
            name="officialSavingDate"
            placeholder="Oficial del Saving"
            value={
              formValues.officialSavingDate
                ? formValues.officialSavingDate.split("T")[0]
                : new Date().toISOString().split("T")[0]
            } // Asegúrate de que el valor se controle
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />
        </div>
        {/* Campo 6: Comentario (este ocupará su propia fila si el grid es de 3 columnas) */}
        {/* El div vacío aquí puede ser removido si no cumple un propósito de layout */}

        <div className="lg:col-span-3 ">
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
            value={formValues.comment || ""} // Asegúrate de que el valor se controle
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
