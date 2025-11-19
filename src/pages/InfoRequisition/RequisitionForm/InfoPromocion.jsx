import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { convertirBase64 } from "../../../utils/Base64.js";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview/FileUploadWithPreview.jsx";

import Tooltip from "../../../components/Tooltip";
import websiteConfigStore from "../../../../stores/WebsiteConfig";
export default function InfoPromocion() {
  const language = websiteConfigStore((s) => s.language);
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  //API - Keeping the call as formValues?.requestTypeId is used in AsyncSelect URL
  useApiGet(["RequestType"], getRequestType);
  const allowedMonths = [
    { value: "04", label: "Abril" },
    { value: "07", label: "Julio" },
    { value: "10", label: "Octubre" },
  ]; // Obtener el año actual
  const currentYear = new Date().getFullYear();

  // Manejar cambio de mes
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    // Crear una fecha por defecto (primer día del mes seleccionado)
    const newDate = new Date(currentYear, selectedMonth - 1, 1)
      .toISOString()
      .split("T")[0];
    setFormValues({
      ...formValues,
      movementDate: newDate,
    });
  };

  // Obtener el mes actual del formValues para pre-seleccionar
  const selectedMonth = formValues.movementDate
    ? formValues.movementDate.split("-")[1]
    : "04"; // Por defecto, abril

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Promoción
      </h1>

      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se asegura 1 columna en móvil, 2 en mediano y 3 en grande */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Campo 1: Motivo */}

        {/* Campo 4: Fecha Oficial del Movimiento (Fecha efectiva) */}
        <div>
          <div className="flex">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300 mr-2"
              htmlFor="promotionDate"
            >
              {language === "es" ? "Fecha del Movimiento" : "Movement Date"}
            </label>
            <Tooltip
              text={
                language === "es"
                  ? "Fecha real en la que la persona ocupa su nueva posición"
                  : "Effective date the person starts their new position"
              }
            />
          </div>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="promotionDate"
            type="date"
            name={language === "es" ? "Fecha de Promoción" : "Promotion Date"}
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
          />{" "}
        </div>

        {/* Campo 5: Ventana de Promocion */}
        <div>
          <div className="flex">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300 mr-2"
              htmlFor="movementDate" // Corregido a "MovementDate" si es un error de tipeo original
            >
              {language === "es" ? " Fecha de Promoción" : "Promotion Date"}
              <span className="text-red-500">*</span>
            </label>{" "}
            <Tooltip
              text={
                language === "es"
                  ? "Fechas oficiales de promoción aprobadas por el Grupo"
                  : "Official promotion dates approved by the Group"
              }
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                 dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            id="movementMonth"
            name="movementDate"
            value={selectedMonth}
            onChange={handleMonthChange}
            autoComplete="off"
          >
            {allowedMonths.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campo 7: Comentario (ocupa las 3 columnas en pantallas grandes) */}
        <div className="lg:col-span-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor={language === "es" ? "Comentario" : "comment"}
          >
            {language === "es" ? "Comentario" : "Comments"}{" "}
          </label>
          <textarea
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400 h-[200px]"
            placeholder={language === "es" ? "Comentario" : "comment"}
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
