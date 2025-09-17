import React, { useEffect } from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import AsyncSelectFreeText from "../../../components/AsyncComponents/AsyncSelectFreeText.jsx";
import formStore from "../../../../stores/FormStore.js";
import { formatIsoDateToYYYYMMDD } from "../../../utils/dateFormat.js";
import { getRequestType } from "../../../api/urls/Request.js";
import { Info } from "lucide-react"; // Importa el icono Info
import { getEmployeeById } from "../../../api/urls/Employee";
import { useApiGet } from "../../../api/config/customHooks";
import { useLocation } from "react-router-dom";
export default function Entrada() {
  const location = useLocation();
  const employeeSelected = formStore((state) => state.employeeSelected);
  const setEmployeeSelected = formStore((state) => state.setEmployeeSelected);
  // Global state from FormStore
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  const { data: employeeData, isLoading } = useApiGet(
    ["employeeById", formValues?.employeeId],
    () => getEmployeeById(formValues?.employeeId),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!formValues?.employeeId, // Habilita la llamada solo si hay un employeeId
    }
  );
  // API call - Keeping it as it might influence formValues.requestTypeId from a parent context
  // but removing unused destructuring variables.
  useApiGet(["RequestType"], getRequestType);
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
  }, [formValues?.employeeId, employeeData, setEmployeeSelected]); // Añadir employeeData y setEmployeeSelected a las dependencias
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
        Entrada de Requisición
      </h1>
      {/* ESTE ES EL ÚNICO CONTENEDOR PRINCIPAL DEL GRID */}
      {/* Se asegura 1 columna en móvil, 2 en mediano y 3 en grande */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Campo 2: Periodo */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="period"
          >
            Periodo
            {formValues?.requisitionTypeId === 12 && (
              <span className="text-red-500"> *</span>
            )}
          </label>
          <select
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
    ${
      formValues.requisitionTypeId === 5 || formValues.requisitionTypeId === 11
        ? "bg-gray-100 cursor-not-allowed"
        : "bg-white"
    } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
    dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="temporaryMonth"
            name="temporaryMonth"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: parseInt(e.target.value, 10),
              });
            }}
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
              <option
                key={periodNum}
                value={periodNum}
                selected={periodNum == formValues.temporaryMonth ? true : false}
              >
                {/* Añade value={periodNum} aquí */}
                {periodNum}
              </option>
            ))}
          </select>
        </div>
        {/* Campo 3: TForm, Aplica solo para new Joiner*/}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="motivo" // ID corregido y único
          >
            Origen de la Contratación
            <span className="text-red-500">*</span>{" "}
            {/* Asterisco de requerido */}
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getRequisitionFeature?requisitionFeatureId=9`}
            name={"process"}
            id={"process"} // Añadido ID
            value={formValues?.process || ""} // Usamos 'value' y un fallback a ""
            className="w-full text-base"
            required // Añadido required si este campo debe ser obligatorio
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="tForm" // ID único y corregido
          >
            TForm <span className="text-red-500">*</span>
          </label>
          <input
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       ${
                         formValues.process !== 21 ||
                         formValues.requisitionTypeId === 12 ||
                         formValues.requisitionTypeId === 11 ||
                         formValues.requisitionTypeId === ""
                           ? "bg-gray-100 cursor-not-allowed"
                           : "bg-white"
                       } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="tForm" // ID único y corregido
            name="tForm"
            placeholder="TForm"
            disabled={
              formValues.process !== 21 ||
              formValues.requisitionTypeId === 12 ||
              formValues.requisitionTypeId === 11 ||
              formValues.requisitionTypeId === ""
            }
            onChange={(e) => {
              formValues.requisitionTypeId === 5 &&
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
            }}
            autoComplete="off"
            value={formValues.tForm || ""}
            required={formValues.requisitionTypeId === 5}
            type="number"
          />
        </div>
        {/*INFORMACION DEL EMPLEADO */}
        <div className={`col-span-3`}>
          <h1 className="text-2xl font-semibold text-gray-800  dark:text-gray-200">
            Informacion de Empleado
          </h1>{" "}
          {formValues.requisitionTypeId === 11 && (
            <h1 className="mt-2 text-lg font-semibold">
              Empleado de la requisición anterior
            </h1>
          )}
          {/* Campo 1: Código de Posición */}{" "}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-6 ">
            {formValues.requisitionTypeId !== 11 ? (
              <>
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                    htmlFor="positionCode"
                  >
                    Código de Posición{" "}
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
                    id="positionCode"
                    name="positionCode"
                    placeholder="Código de Posición"
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    autoComplete="off"
                    value={formValues.positionCode || ""}
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
                    url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getEmployeesBySupervisorRole`}
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
                    url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/GetGrades`}
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
                  <AsyncSelectFreeText
                    url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/GetProjectsByExactus`}
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
                    Nombre del Area{" "}
                    {(formValues?.requisitionTypeId === 5 ||
                      formValues?.requisitionTypeId === 12) && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <AsyncSelect
                    url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getDepartments`}
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

                {/* 
                <div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                    htmlFor="sodMatrix" // ID único y corregido
                  >
                    Perfil SOD <span className="text-red-500">*</span>
                
                  </label>
                  <AsyncSelect
                    url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getMatriz`}
                    name={"sodMatrix"}
                    id={"sodMatrix"} // Añadido ID
                    value={formValues.sodMatrix || ""}
                    className="w-full text-base"
                    disabled={formValues?.requisitionTypeId === 11}
                    required
                  />
                </div>*/}
              </>
            ) : (
              <>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                    htmlFor="employeeId"
                  >
                    Nombre
                  </label>
                  <AsyncSelect
                    url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getEmployees`}
                    name={"employeeId"}
                    customNameParam="nombre"
                    //para promocion no debe ser obligatorio
                    required={false}
                    disabled={true}
                    value={location.state.prevRequisition?.employeeId || ""}
                    className="w-full text-base"
                  />
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
                {/* Campo 8: Departamento */}
                <div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                    htmlFor="departamento"
                  >
                    Nombre de Area
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
                    value={employeeSelected?.descrip_Area || ""}
                    autoComplete="off"
                    // Se elimina onChange en inputs deshabilitados
                  />
                </div>{" "}
                {/*<div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                    htmlFor="departamento"
                  >
                    Perfil SOD
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-gray-100 text-gray-600 cursor-not-allowed
                       focus:outline-none focus:ring-0 focus:border-gray-300 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-400"
                    disabled
                    id="perfilSOD" // ID corregido
                    type="text"
                    name="perfilSOD" // Name corregido
                    value={employeeSelected?.gerente || ""}
                    autoComplete="off"
                    // Se elimina onChange en inputs deshabilitados
                  />
                </div>*/}
              </>
            )}
            {formValues?.requisitionTypeId === 11 && (
              <>
                <div></div>
              </>
            )}
          </div>
          <h1 className="text-lg font-semibold text-gray-800 mb-6 dark:text-gray-200 mt-4">
            Empleado
          </h1>
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-2">
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
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
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
                required={!formValues.requisitionTypeId === 5}
                disabled={
                  //Si ingreso nuevo y concurso interno no se llena
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                }
              />
            </div>
            {/* Campo 2: Exactus ID */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="exactusId"
              >
                Exactus ID {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="exactusId"
                name="exactusId"
                placeholder="Exactus ID"
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
                disabled={
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                }
              />
            </div>
            {/* Campo 3: Carrer Settings ID */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="careerSettingsId"
              >
                Career Settings ID
                {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="careerSettingsId"
                name="careerSettingsId"
                placeholder="Carrer Settings ID"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                autoComplete="off"
                value={formValues.careerSettingsId || ""}
                type="number"
                disabled={
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                }
              />
            </div>
            {/* Campo 4: Lion Login */}
            <div>
              <label
                className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
                htmlFor="lionLogin"
              >
                Lion Login {/* <span className="text-red-500">*</span>*/}
              </label>
              <input
                className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base ${
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="lionLogin"
                name="lionLogin"
                placeholder="Lion Login"
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
                disabled={
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                }
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
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
                id="companyEmail"
                name="companyEmail"
                placeholder="Correo empresa"
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
                disabled={
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                }
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
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
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
                value={
                  formValues.startDate
                    ? formValues.startDate.split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                type="date"
                disabled={
                  formValues.requisitionTypeId === 5 &&
                  formValues.recruitmentProccess === 14
                }
                X
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
              setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }}
            autoComplete="off"
            value={formValues.comment || ""}
          />
        </div>{" "}
      </div>
      {/* Campo 1: Nombre */}
    </>
  );
}
