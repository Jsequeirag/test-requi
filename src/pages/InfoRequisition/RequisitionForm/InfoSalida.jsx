import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import FileUploadWithPreview from "../../../components/FileUploadWithPreview/FileUploadWithPreview.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";
import Tooltip from "../../../components/Tooltip.jsx";
import { RequisitionType } from "../../../contants/requisitionType.js";
import { RequestType } from "../../../contants/requestType.js";
import websiteConfigStore from "../../../../stores/WebsiteConfig.js";
export default function InfoSalida() {
  const language = websiteConfigStore((s) => s.language);
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  //API - Keeping the call as formValues?.requestTypeId is used in AsyncSelect URLs
  useApiGet(["RequestType"], getRequestType);
  // API GET HOOK (for employees by boss)

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        {language === "es" ? "Salida" : "Leaver"}
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
            {language === "es" ? "Tipo" : "Type"}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}/false`}
            name={"requisitionTypeId"}
            customNameParam={language === "es" ? "name" : "nameEn"}
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
            {" "}
            {language === "es" ? "Razón" : "Reason"}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getRequisitionSubtypeByRequisitionTypeId/${
              formValues?.requisitionTypeId || ""
            }`}
            value={formValues?.requisitionSubtypeId || ""}
            name={"requisitionSubtypeId"}
            customNameParam={language === "es" ? "name" : "nameEn"}
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
            {formValues?.requisitionTypeId === RequisitionType.Despido
              ? language === "es"
                ? "Carta de Despido"
                : "Dismissal Letter"
              : language === "es"
              ? "Carta de Renuncia"
              : "Resignation Letter"}
            <span className="text-red-500">*</span>{" "}
          </label>

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
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="rehirable" // ID único
          >
            {" "}
            {language === "es" ? "Periodo de prueba" : "Trieal Period"}
            <span className="text-red-500">*</span>{" "}
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

            <option value={true}>
              <option value={true}> {language === "es" ? "Sí" : "Yes"}</option>
            </option>
            <option value={false}>No</option>
          </select>
        </div>
        {/* Campo 5: Recontratable */}
        <div>
          <div className="flex">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300 mr-2"
              htmlFor="officialEmployeeDepartureDate" // ID único
            >
              R-Form{" "}
              {formValues?.requisitionTypeId === RequisitionType.Despido &&
                formValues?.trialPeriod === false && (
                  <span className="text-red-500">*</span>
                )}
              {/* Asterisco de requerido */}
            </label>
          </div>
          <input
            required
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                 ${
                   formValues?.requisitionTypeId !== RequisitionType.Despido ||
                   formValues?.trialPeriod !== false
                     ? "bg-gray-100 cursor-not-allowed"
                     : "bg-white"
                 }
                 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                 dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            type="text"
            id="rForm" // ID único
            name="rForm"
            placeholder="R-Form"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={formValues.rForm ? formValues.rForm : ""}
            disabled={
              formValues?.requisitionTypeId !== RequisitionType.Despido ||
              formValues?.trialPeriod !== false
            }
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="rehirable" // ID único
          >
            {language === "es" ? "Recontratable" : "Rehirable"}
            <span className="text-red-500">*</span>{" "}
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

            <option value={true}> {language === "es" ? "Sí" : "Yes"}</option>
            <option value={false}>No</option>
          </select>
        </div>
        {/* Campo 6: Fecha Oficial de Salida */}
        <div>
          <div className="flex">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300 mr-2"
              htmlFor="officialEmployeeDepartureDate" // ID único
            >
              {language === "es"
                ? " Fecha Oficial de Salida"
                : "Official Departure Date"}
              <span className="text-red-500">*</span>{" "}
              {/* Asterisco de requerido */}
            </label>

            <Tooltip
              text={
                formValues?.requisitionTypeId === RequisitionType.Despido
                  ? language === "es"
                    ? "Fecha oficial que indica la Carta de Despido"
                    : "Official date indicated in the Dismissal Letter"
                  : language === "es"
                  ? "Fecha oficial que indica la Carta de Renuncia"
                  : "Official date indicated in the Resignation Letter"
              }
            />
          </div>
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
        </div>
        {/* Campo 7: Fecha Real de Salida */}
        <div>
          <div className="flex ">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300 mr-2"
              htmlFor="employeeDepartureDate" // ID único
            >
              {language === "es"
                ? "Fecha Oficial de Salida"
                : "Real Departure Date"}
              <span className="text-red-500">*</span>{" "}
              {/* Asterisco de requerido */}
            </label>
            <Tooltip
              text={
                language === "es"
                  ? "Último día laboral del empleado"
                  : "Employee's last working day"
              }
            />
          </div>
          <input
            required
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                     bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400`}
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
          <div className="flex">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300 mr-2"
              htmlFor="returnWorkEquipmentDate" // ID único
            >
              {language === "es"
                ? "Fecha Entrega de Equipo"
                : "Equipment Delivery Date"}
              <span className="text-red-500">*</span>
              {/* Asterisco de requerido */}
            </label>
            <Tooltip
              text={
                language === "es"
                  ? "Fecha en la que el colaborador entrega el equipo"
                  : "Date on which the employee returns the equipment"
              }
            />
          </div>
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
            {language === "es" ? "Número de teléfono" : "Phone Number"}
            <span className="text-red-500">*</span>{" "}
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
            placeholder={
              language === "es" ? "Número de teléfono" : "Phone Number"
            }
            onChange={(e) => {
              e.target.value.length <= 8 &&
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
            {" "}
            {language === "es" ? "Correo Personal" : "E-mail"}
            <span className="text-red-500">*</span>{" "}
          </label>
          <input
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400"
            type="email"
            name="personalEmail"
            id="personalEmail" // ID único
            placeholder={language === "es" ? "Correo Personal" : "E-mail"}
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
            {language === "es" ? "Nueva Empresa" : "New Company"}
          </label>
          <input
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
  ${
    formValues?.requisitionTypeId === RequisitionType.Despido
      ? "bg-gray-100 cursor-not-allowed"
      : "bg-white"
  } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
             dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            type="text"
            name="joinNewCompany" // Nombre corregido
            id="joinNewCompany" // ID corregido
            placeholder={language === "es" ? "Nueva Empresa" : "New Company"}
            onChange={(e) => {
              // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
              setFormValues({
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={formValues.joinNewCompany || ""}
            required={formValues?.requisitionTypeId === RequisitionType.Despido} // Despido
            disabled={formValues?.requisitionTypeId === RequisitionType.Despido} // Despido
          />
        </div>
        {/* Campo 13: Comentario (ocupa las 3 columnas en pantallas grandes) */}
        <div className="lg:col-span-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="comment" // ID único
          >
            {language === "es" ? "Comentario" : "Comments"}
          </label>
          <textarea
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600  dark:focus:ring-blue-400 dark:focus:border-blue-400 h-[200px]"
            placeholder={language === "es" ? "Comentario" : "Comments"}
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
