import React from "react";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { convertirBase64 } from "../../../utils/Base64.js";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview/FileUploadWithPreview.jsx";
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

        {/* Campo 2: Level Up */}
        {/*
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="levelUp" // ID corregido y único
          >
            Level Up <span className="text-red-500">*</span>{" "}
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
          >
        
            <option value="" disabled>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </div>
 */}
        {/* Campo 3: Carta de Promocion */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="promotionLetterAttachment" // ID más descriptivo
          >
            Carta de Promoción
            {/* Asterisco de requerido */}
          </label>
          {/* <input
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
          />*/}
          <FileUploadWithPreview
            name="attachmentBase64"
            onFileChange={(data) => {
              setFormValues({
                attachmentBase64: data,
              });
            }}
            accept=".pdf, image/*"
            id="attachmentBase64"
            value={formValues?.attachmentBase64 || ""}
          />
        </div>

        {/* Campo 4: Fecha Oficial del Movimiento (Fecha efectiva) */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="promotionDate"
          >
            Fecha Oficial del Movimiento (Fecha efectiva){" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="promotionDate"
            type="date"
            name="promotionDate"
            value={
              formValues.promotionDate
                ? formValues.promotionDate.split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />
        </div>

        {/* Campo 5: Ventana de Promocion */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="movementDate" // Corregido a "MovementDate" si es un error de tipeo original
          >
            Ventana de Promoción <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="movementMonth" // Corregido a "movementMonth"
            type="date"
            name="movementDate" // Corregido a "MovementDate"
            value={
              formValues.movementDate
                ? formValues.movementDate.split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onChange={(e) => {
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
          />
        </div>

        {/* Campo 6: Justificación de Promocion (Ingles) */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="promotionJustification"
          >
            Justificación de Promoción (Ingles) {/* Asterisco de requerido */}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="promotionJustification"
            name="promotionJustification"
            placeholder="Justificación de Promoción"
            value={formValues.promotionJustification || ""} // Asegura que el valor se controle, y usa el nombre consistente
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
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
