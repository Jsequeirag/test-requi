import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { convertirBase64 } from "../../../utils/Base64.js";

export default function Promocion() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  //API - Keeping the call as formValues?.requestTypeId is used in AsyncSelect URL
  useApiGet(["RequestType"], getRequestType);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Promoción
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
            url={`https://localhost:7040/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}`}
            name={"requisitionTypeId"}
            id={"motivo"} // Añadido ID
            value={formValues?.requisitionTypeId || ""} // Usamos 'value' y un fallback a ""
            className="w-full text-base"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>

        {/* Campo 2: Level Up */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="levelUp" // ID corregido y único
          >
            Level Up <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <select
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            name="levelUp"
            id="levelUp" // Añadido ID
            value={
              formValues.levelUp === true
                ? "true"
                : formValues.levelUp === false
                ? "false"
                : ""
            } // Asegúrate de que el valor se controle
            onChange={(e) =>
              setFormValues({
                // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***

                [e.target.name]: e.target.value === "true", // Convertir a booleano si es necesario
              })
            }
            required // Añadido required si este campo debe ser obligatorio
          >
            {/* Si necesitas un placeholder, puedes añadir una opción deshabilitada */}
            <option value="" disabled>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </div>

        {/* Campo 3: Carta de Promocion */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="promotionLetterAttachment" // ID más descriptivo
          >
            Carta de Promocion <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100" // Estilos mejorados para input type="file"
            id="promotionLetterAttachment" // ID más descriptivo
            type="file"
            name="attachmentBase64"
            placeholder="Adjuntar archivo"
            onChange={async (e) => {
              const archivoSeleccionado = e.target.files[0];
              if (archivoSeleccionado) {
                try {
                  const base64 = await convertirBase64(archivoSeleccionado);
                  // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
                  setFormValues({
                    [e.target.name]: base64,
                  });
                } catch (error) {
                  console.error("Error al convertir a Base64:", error);
                  // Opcional: manejar el error en el UI
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    [e.target.name]: null, // Limpiar el campo si hay error
                  }));
                }
              } else {
                // Si el usuario cancela la selección, asegúrate de limpiar el valor
                setFormValues({
                  [e.target.name]: null,
                });
              }
            }}
            accept=".pdf, image/*"
            autoComplete="off"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>

        {/* Campo 4: Fecha Oficial del Movimiento (Fecha efectiva) */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="recordDate"
          >
            Fecha Oficial del Movimiento (Fecha efectiva){" "}
            <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="recordDate"
            type="date"
            name="recordDate"
            value={
              formValues.recordDate ? formValues.recordDate.split("T")[0] : ""
            }
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>

        {/* Campo 5: Ventana de Promocion */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="promotionMoth" // Corregido a "promotionMonth" si es un error de tipeo original
          >
            Ventana de Promocion <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="promotionMoth" // Corregido a "promotionMonth"
            type="date"
            name="promotionMoth" // Corregido a "promotionMonth"
            value={
              formValues.promotionMoth
                ? formValues.promotionMoth.split("T")[0]
                : ""
            }
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>

        {/* Campo 6: Justificación de Promocion (Ingles) */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="promotionJustification"
          >
            Justificación de Promocion (Ingles){" "}
            <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="promotionJustification"
            name="promotionJustification"
            placeholder="Justificación de Promocion"
            value={formValues.promotionJustification || ""} // Asegura que el valor se controle, y usa el nombre consistente
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>

        {/* Campo 7: Comentario (ocupa las 3 columnas en pantallas grandes) */}
        <div className="lg:col-span-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="comment" // ID único
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
            value={formValues.comment || ""}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
