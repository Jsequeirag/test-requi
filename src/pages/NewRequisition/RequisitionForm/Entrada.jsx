import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { getRequestType } from "../../../api/urls/Request.js";

export default function Entrada() {
  // Global state from FormStore
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  // API call - Keeping it as it might influence formValues.requestTypeId from a parent context
  // but removing unused destructuring variables.
  useApiGet(["RequestType"], getRequestType);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Entrada de Requisición
      </h1>

      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se asegura 1 columna en móvil, 2 en mediano y 3 en grande */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Campo 1: Motivo 
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="motivo" // ID único y corregido
          >
            Motivo <span className="text-red-500">*</span>{" "}
          </label>
          <AsyncSelect
            url={`https://localhost:7040/GetRequisitionTypeByRequestTypeId/${formValues?.requestTypeId}/false`}
            name={"requisitionTypeId"}
            id={"requisitionTypeId"} // Añadido ID
            value={formValues?.requisitionTypeId || ""} // Usamos 'value' y un fallback a ""
            className="w-full text-base"
            required={
              !formValues?.requisitionTypeId && !formValues?.requisitionTypeId
            }
          />
        </div>*/}
        {/* Campo 2: Periodo */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="period"
          >
            Periodo
            {formValues?.requisitionTypeId === 12 && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <select
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
              ${
                formValues.requisitionTypeId === 5 ||
                formValues.requisitionTypeId === 11
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                   dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="period"
            name="period"
            onChange={(e) =>
              setFormValues({
                [e.target.name]: e.target.value, // Convertir a número
              })
            } // Usar el nuevo handler
            required
            disabled={
              formValues.requisitionTypeId === 11 ||
              formValues.requisitionTypeId === 5
            }
          >
            <option selected value="" disabled>
              Selecciona un periodo
            </option>{" "}
            {/* Opción por defecto */}
            {/* Generar opciones del 1 al 12 */}
            {Array.from({ length: 12 }, (_, i) => i + 1).map((periodNum) => (
              <option key={periodNum} value={periodNum}>
                {periodNum}
              </option>
            ))}
          </select>
        </div>
        {/* Campo 3: TForm, Aplica solo para new Joiner*/}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="tForm" // ID único y corregido
          >
            TForm{" "}
            {formValues?.requisitionTypeId === 5 && (
              <span className="text-red-500">*</span>
            )}
            {/* Asterisco de requerido */}
          </label>
          <input
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       ${
                         formValues.requisitionTypeId === 12 ||
                         formValues.requisitionTypeId === 11
                           ? "bg-gray-100 cursor-not-allowed"
                           : "bg-white"
                       } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="tForm" // ID único y corregido
            name="tForm"
            placeholder="TForm"
            disabled={
              formValues.requisitionTypeId === 12 ||
              formValues.requisitionTypeId === 11
            }
            required
            onChange={(e) => {
              formValues.requisitionTypeId &&
                // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
                setFormValues({
                  [e.target.name]: e.target.value,
                });
            }}
            autoComplete="off"
            value={formValues.tForm || ""}
          />
        </div>
        {/*INFORMACION DEL EMPLEADO */}
        <div className={`col-span-3`}>
          <h1 className="text-2xl font-semibold text-gray-800  dark:text-gray-200">
            Informacion de Empleado
          </h1>
          <div></div> <div></div>
          {/* Campo 1: POS_COD */}{" "}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-6">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="posCode"
              >
                POS_COD{" "}
                {(formValues?.requisitionTypeId === 5 ||
                  formValues?.requisitionTypeId === 12) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                        ${
                          formValues.requisitionTypeId === 11
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white"
                        } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="posCode"
                name="posCode"
                placeholder="POS_COD"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.posCode || ""}
                maxLength={8}
                pattern="[A-Za-z0-9]{1,8}"
                title="Solo caracteres alfanuméricos, máximo 8 caracteres"
                disabled={formValues.requisitionTypeId === 11}
              />
            </div>
            {/* Campo 2: Supervisor */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="supervisor"
              >
                Supervisor{" "}
                {(formValues?.requisitionTypeId === 5 ||
                  formValues?.requisitionTypeId === 12) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <AsyncSelect
                url={`https://localhost:7040/getEmployeesBySupervisorRole`}
                name={"supervisor"}
                id={"supervisor"}
                value={formValues?.supervisor || ""}
                className="w-full text-base"
                customNameParam={"nombre"}
                required={true}
                placeholder="Lista desplegable de personas con puestos de liderazgo"
                disabled={formValues.requisitionTypeId === 11}
              />
            </div>
            {/* Campo 3: Grado */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="grade"
              >
                Grado{" "}
                {(formValues?.requisitionTypeId === 5 ||
                  formValues?.requisitionTypeId === 12) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <AsyncSelect
                url={`https://localhost:7040/GetGrades`}
                name={"grade"}
                id={"grade"}
                value={formValues?.grade || ""}
                className="w-full text-base"
                required={true}
                placeholder="Lista desplegable de los grados únicos de exactus"
                disabled={formValues.requisitionTypeId === 11}
              />
            </div>
            {/* Campo 4: Proyecto */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="project"
              >
                Proyecto{" "}
                {(formValues?.requisitionTypeId === 5 ||
                  formValues?.requisitionTypeId === 12) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <AsyncSelect
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
            {/* Campo 5: Departamento */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="department"
              >
                Departamento{" "}
                {(formValues?.requisitionTypeId === 5 ||
                  formValues?.requisitionTypeId === 12) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <AsyncSelect
                url={`https://localhost:7040/getDepartments`}
                name={"department"}
                id={"department"}
                customNameParam={"descriptionDepartamento"}
                customIdParam={"departamento"}
                value={formValues?.department || ""}
                className="w-full text-base"
                required={true}
                placeholder="Lista desplegable de los nombres de las áreas únicas de exactus"
                disabled={formValues?.requisitionTypeId === 11}
              />
            </div>

            {/* Campo 7: Matriz SOD */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="sodMatrix" // ID único y corregido
              >
                Matriz SOD {/* <span className="text-red-500">*</span>*/}
                {/* Asterisco de requerido */}
              </label>
              <AsyncSelect
                url={`https://localhost:7040/getMatriz`}
                name={"sodMatrix"}
                id={"sodMatrix"} // Añadido ID
                value={formValues.sodMatrix || ""}
                className="w-full text-base"
                disabled={formValues?.requisitionTypeId === 11}
              />
            </div>
            {/*<div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="recruitment" // ID único para este select
              >
                Reclutamiento
                {formValues.requisitionTypeId !== 5 && (
                  <span className="text-red-500">*</span>
                )}{" "}
              </label>
              <select
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base 
                     ${
                       formValues.requisitionTypeId !== 5
                         ? "bg-gray-100 cursor-not-allowed"
                         : "bg-white"
                     }
                   text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                   dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="recruitmentType" // ID único
                name="recruitmentType" // Nombre para el campo en formValues
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={formValues.recruitmentType || ""}
                disabled={formValues.requisitionTypeId !== 5} // Controla el valor
                required
              >
                <option value="" disabled>
                  Selecciona tipo de reclutamiento
                </option>
                <option value="Internal">Interno</option>
                <option value="External">Externo</option>
              </select>
            </div>*/}
            {/* Campo 1: Full Name */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="fullName"
              >
                Nombre{" "}
                {!formValues.requisitionTypeId == 11 ||
                  !formValues.requisitionTypeId === 12 ||
                  (!formValues.requisitionTypeId === 5 &&
                    !formValues.recruitmentProccess === 14 && (
                      <>{/* <span className="text-red-500">*</span>*/}</>
                    ))}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="fullName"
                name="fullName"
                placeholder="Nombre"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.fullName || ""}
                type="text"
                required={
                  !formValues.requisitionTypeId == 11 ||
                  !formValues.requisitionTypeId === 12 ||
                  (!formValues.requisitionTypeId === 5 &&
                    !formValues.recruitmentProccess)
                }
                disabled={
                  !formValues.requisitionTypeId == 11 ||
                  !formValues.requisitionTypeId === 12 ||
                  (!formValues.requisitionTypeId === 5 &&
                    !formValues.recruitmentProccess)
                }
              />
            </div>
            {/* Campo 2: Exactus ID */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="exactusId"
              >
                ID Empleado Exactus{" "}
                {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="exactusId"
                name="exactusId"
                placeholder="ID Empleado Exactus"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.exactusId || ""}
                type="number"
                max={999999}
                min={0}
                pattern="[0-9]{1,6}"
                title="Solo números, máximo 6 caracteres"
                disabled={formValues?.recruitmentType === "Internal"}
              />
            </div>
            {/* Campo 3: Carrer Settings ID */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="carrerSettingsId"
              >
                Carrer Settings ID{" "}
                {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="carrerSettingsId"
                name="carrerSettingsId"
                placeholder="Carrer Settings ID"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.carrerSettingsId || ""}
                type="number"
                disabled={formValues?.recruitmentType === "Internal"}
              />
            </div>
            {/* Campo 4: Lion Login */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="lionLogin"
              >
                LL {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="lionLogin"
                name="lionLogin"
                placeholder="LL"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.lionLogin || ""}
                type="text"
                pattern="[A-Za-z0-9]+"
                title="Solo caracteres alfanuméricos"
                disabled={formValues?.recruitmentType === "Internal"}
              />
            </div>
            {/* Campo 5: Company Email */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="companyEmail"
              >
                Correo empresa {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="companyEmail"
                name="companyEmail"
                placeholder="correo electronico"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.companyEmail || ""}
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Ingrese un correo electrónico válido"
                disabled={formValues?.recruitmentType === "Internal"}
              />
            </div>
            {/* Campo 6: Start Date */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="startDate"
              >
                Fecha de Ingreso {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="startDate"
                name="startDate"
                placeholder="Fecha"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.startDate || ""}
                type="date"
                disabled={formValues?.recruitmentType === "Internal"}
                X
              />
            </div>
            {/* Campo 5: Correo empresa */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="companyEmail"
              >
                Correo empresa {/* <span className="text-red-500">*</span>*/}
                {/* Asterisco de requerido */}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues?.recruitmentType === "Internal"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="companyEmail"
                name="companyEmail"
                placeholder="Correo de compañia"
                onChange={(e) => {
                  // *** CORRECCIÓN CRÍTICA: Asegura que se fusiona el estado anterior ***
                  setFormValues({
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.companyEmail || ""}
                disabled={formValues?.recruitmentType === "Internal"}
              />
            </div>
          </div>
          {/* Campo 8: Comentario (ocupará 3 columnas en LG) */}
        </div>{" "}
        <div className="lg:col-span-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="comment" // ID único y corregido
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
