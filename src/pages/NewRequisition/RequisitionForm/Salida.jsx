import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { convertirBase64 } from "../../../utils/Base64.js";

export default function Salida() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  //API - Keeping the call as formValues?.requestTypeId is used in AsyncSelect URLs
  useApiGet(["RequestType"], getRequestType);
  // API GET HOOK (for employees by boss)

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Salida de Empleado
      </h1>

      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se asegura 1 columna en móvil, 2 en mediano y 3 en grande */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Campo 1: Motivo (requisitionTypeId) */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="requisitionMotivo" // ID único
          >
            Motivo{" "}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <AsyncSelect
            url={`https://localhost:7040/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}`}
            name={"requisitionTypeId"}
            id={"requisitionMotivo"} // Añadido ID
            value={formValues?.requisitionTypeId || ""}
            className="w-full text-base"
          />
        </div>
        {/* Campo 11: Motivo (Reason) */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="dismissalType" // ID único
          >
            Razón{" "}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getRequisitionSubtypeByRequisitionTypeId?RequisitionTypeId=${
              formValues?.requisitionTypeId || ""
            }`}
            value={formValues?.requisitionSubtype || ""}
            name={"requisitionSubtype"}
            id={"RequisitionSubtypeSelect"} // Añadido ID
            className="w-full text-base"
          />
        </div>
        {/* Campo 2: Carta de Renuncia */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="resignationLetterAttachment" // ID único
          >
            {formValues?.requisitionTypeId === 4
              ? "Carta de Despido"
              : "Carta de Renuncia"}{" "}
            <span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100" // Estilos mejorados para input type="file"
            id="resignationLetterAttachment" // ID único
            type="file"
            name="attachmentBase64"
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
                  setFormValues({
                    [e.target.name]: null,
                  });
                }
              } else {
                setFormValues({
                  [e.target.name]: null,
                });
              }
            }}
            accept=".pdf, image/*"
            autoComplete="off"
          />
        </div>
        {/* Campo 3: Tipo de Despido */}
        {/* <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="dismissalType" // ID único
          >
            {formValues?.requisitionTypeId === 4
              ? "Tipo de Despido"
              : "Tipo de Renuncia"}
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getRequisitionSubtypeByRequisitionTypeId?RequisitionTypeId=${
              formValues?.requisitionTypeId || ""
            }`}
            value={formValues?.requisitionSubtype || ""}
            name={"requisitionSubtype"}
            id={"dismissalType"} // Añadido ID
            className="w-full text-base"
          />
        </div>*/}
        {/* Campo : RForm */}
        {/* 
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="rForm" // ID único
          >
            RForm
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            disabled={formValues?.requisitionSubtype !== 1} // Mantener lógica de deshabilitado
            id="rForm" // ID único
            name="rForm"
            value={
              formValues?.requisitionSubtype === 1 ? formValues.rForm || "" : ""
            }
            placeholder="RForm"
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                [e.target.name]: e.target.value,
              }));
            }}
            autoComplete="off"
          />
        </div>
*/}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="rehirable" // ID único
          >
            Periodo de prueba <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <select
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            name="trialPeriod"
            id="trialPeriod" // Añadido ID
            value={
              formValues.trialPeriod === true
                ? "true"
                : formValues.trialPeriod === false
                ? "false"
                : ""
            } // Controlar el valor del select
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior y convierte a booleano ***
              setFormValues({
                [e.target.name]: e.target.value === "true",
              });
            }}
          >
            {/* Solo una opción puede ser 'selected' inicialmente, si no, es mejor omitirlo y dejar que el estado lo controle */}
            <option value="" disabled>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </div>
        {/* Campo 5: Recontratable */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="rehirable" // ID único
          >
            Recontratable <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <select
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            name="rehirable"
            id="rehirable" // Añadido ID
            value={
              formValues.rehirable === true
                ? "true"
                : formValues.rehirable === false
                ? "false"
                : ""
            } // Controlar el valor del select
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior y convierte a booleano ***
              setFormValues({
                [e.target.name]: e.target.value === "true",
              });
            }}
          >
            {/* Solo una opción puede ser 'selected' inicialmente, si no, es mejor omitirlo y dejar que el estado lo controle */}
            <option value="" disabled>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option>
            <option value={false}>No</option>
          </select>
        </div>
        {/* Campo 6: Fecha Oficial de Salida */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="officialEmployeeDepartureDate" // ID único
          >
            Fecha Oficial de Salida <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="date"
            id="officialEmployeeDepartureDate" // ID único
            name="officialEmployeeDepartureDate"
            placeholder="Dígite su usuario"
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={
              formValues.officialEmployeeDepartureDate
                ? formValues.officialEmployeeDepartureDate.split("T")[0]
                : ""
            }
          />
        </div>{" "}
        {/* Campo 7: Fecha de Salida */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="employeeDepartureDate" // ID único
          >
            Fecha de Salida <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="date"
            id="employeeDepartureDate" // ID único
            name="employeeDepartureDate"
            placeholder="Dígite su usuario"
            autoComplete="off"
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            value={
              formValues.employeeDepartureDate
                ? formValues.employeeDepartureDate.split("T")[0]
                : ""
            }
          />
        </div>
        {/* Campo 8: Fecha Entrega de Equipo */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="returnWorkEquipmentDate" // ID único
          >
            Fecha Entrega de Equipo <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="date"
            name="returnWorkEquipmentDate"
            id="returnWorkEquipmentDate" // ID único
            placeholder="Dígite su usuario"
            onChange={(e) => {
              // Este onChange ya estaba correcto, pero se estandariza la sintaxis
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={
              formValues.returnWorkEquipmentDate
                ? formValues.returnWorkEquipmentDate.split("T")[0]
                : ""
            }
          />
        </div>
        {/* Campo 9: Número de teléfono */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="phoneNumber" // ID único
          >
            Número de teléfono <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <input
            required
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="number"
            name="phoneNumber"
            id="phoneNumber" // ID único
            placeholder="Número de Teléfono"
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={formValues.phoneNumber || ""}
          />
        </div>
        {/* Campo 10: Correo Personal */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="personalEmail" // ID único
          >
            Correo Personal
            <span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="email"
            name="personalEmail"
            id="personalEmail" // ID único
            placeholder="Correo Personal"
            required
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={formValues.personalEmail || ""}
          />
        </div>
        {/* Campo 12: Nueva Empresa */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="joinNewCompany" // ID corregido de "Companny" a "Company"
          >
            Nueva Empresa
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="text"
            name="joinNewCompany" // Nombre corregido
            id="joinNewCompany" // ID corregido
            placeholder="Nueva empresa"
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={formValues.joinNewCompany || ""}
          />
        </div>
        {/* Campo 13: Comentario (ocupa las 3 columnas en pantallas grandes) */}
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
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400 h-[200px]"
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
      {/*detalles requisicion*/}
    </>
  );
}
