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
import { RequisitionType } from "../../../contants/requisitionType";
import { RequisitionSubtype } from "../../../contants/requisitionSubtypeType";
import {
  EMPLOYEE_MATRIX_CE3,
  EMPLOYEE_MATRIX_CE8,
} from "../../../contants/matrizAvalableFieldInfoRequisition.js";
//para validar las entradas

export default function InfoEntrada() {
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
  const role = location.state?.role;

  const isNuevaPosicion =
    formValues.requisitionTypeId === RequisitionType.NuevaPosicion;
  const EMPLOYEE_MATRICES_BY_SUBTYPE = {
    [RequisitionSubtype.ConcursoExterno3]: EMPLOYEE_MATRIX_CE3,
    [RequisitionSubtype.ConcursoExterno8]: EMPLOYEE_MATRIX_CE8,
  };

  const canEditEmployeeField = (field) => {
    if (!isNuevaPosicion) return true;
    const matrix =
      EMPLOYEE_MATRICES_BY_SUBTYPE[formValues.requisitionSubtypeId];
    if (!matrix) return true; // fallback
    return !!matrix[field]?.[role];
  };

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
            {formValues?.requisitionTypeId === RequisitionType.Temporal && (
              <span className="text-red-500"> *</span>
            )}
          </label>
          <select
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base bg-gray-100 cursor-not-allowed 
       text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
    dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="temporaryMonth"
            name="temporaryMonth"
            onChange={(e) => {
              setFormValues({
                [e.target.name]: parseInt(e.target.value, 10),
              });
            }}
            required
            disabled
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
            {/* Asterisco de requerido */}
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getRequisitionFeature?requisitionFeatureId=9`}
            name={"process"}
            id={"process"} // Añadido ID
            value={formValues?.process || ""} // Usamos 'value' y un fallback a ""
            className="w-full text-base"
            required // Añadido required si este campo debe ser obligatorio
            disabled
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="tForm" // ID único y corregido
          >
            TForm
          </label>
          <input
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-basebg-gray-100 cursor-not-allowed text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="tForm" // ID único y corregido
            name="tForm"
            placeholder="TForm"
            disabled
            onChange={(e) => {
              formValues.requisitionTypeId === RequisitionType.NuevaPosicion &&
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
            }}
            autoComplete="off"
            value={formValues.tForm || ""}
            required={
              formValues.requisitionTypeId === RequisitionType.NuevaPosicion
            }
            type="number"
          />
        </div>{" "}
        {/* Campo 2: Periodo */}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="period"
          >
            Tipo de Temporalidad
          </label>

          <AsyncSelect
            url={`https://localhost:7040/getRequisitionFeature?requisitionFeatureId=10`}
            id={"typeTemporality"}
            name="typeTemporality"
            value={formValues?.typeTemporality || ""}
            className="w-full text-base"
            required={true}
            disabled={
              formValues.requisitionTypeId === RequisitionType.Reemplazo ||
              formValues.requisitionTypeId === RequisitionType.NuevaPosicion
            }
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="period"
          >
            Fecha Estimada de Salida
          </label>

          <input
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-basebg-gray-100 cursor-not-allowed text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="estimatedDepartureDate"
            name="estimatedDepartureDate"
            required
            placeholder="Fecha Estimada de Salida"
            onChange={(e) => {
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={
              formValues.estimatedDepartureDate
                ? formValues.estimatedDepartureDate.split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            type="date"
            disabled
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
            htmlFor="period"
          >
            Fecha Estimada de Regreso
          </label>{" "}
          <input
            className={`border border-gray-300 rounded-lg w-full py-2.5 px-4 text-basebg-gray-100 cursor-not-allowed text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm dark:bg-gray-750 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-400 dark:focus:border-blue-400`}
            id="estimatedReturnDate"
            name="estimatedReturnDate"
            placeholder="Fecha Estimada de Regreso"
            onChange={(e) => {
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              });
            }}
            autoComplete="off"
            value={
              formValues.estimatedReturnDate
                ? formValues.estimatedReturnDate.split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            type="date"
            disabled
          />
        </div>
        {/*INFORMACION DEL EMPLEADO */}
        <div className="col-span-3">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Información de Empleado
          </h1>

          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mt-6">
            {/* Código de Posición */}
            {(() => {
              const canEdit = canEditEmployeeField("positionCode");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Código de Posición{" "}
                    {canEdit && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    name="positionCode"
                    value={formValues.positionCode || ""}
                    disabled={!canEdit}
                    required={canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) =>
                      canEdit &&
                      setFormValues({
                        ...formValues,
                        positionCode: e.target.value,
                      })
                    }
                  />
                </div>
              );
            })()}

            {/* Supervisor */}
            {(() => {
              const canEdit = canEditEmployeeField("supervisor");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Supervisor{" "}
                    {canEdit && <span className="text-red-500">*</span>}
                  </label>
                  <AsyncSelect
                    url={`https://localhost:7040/getEmployeesBySupervisorRole`}
                    name="supervisor"
                    value={formValues?.supervisor || ""}
                    disabled={!canEdit}
                    required={canEdit}
                    customNameParam={"nombre"}
                    onChange={(value) =>
                      canEdit &&
                      setFormValues({ ...formValues, supervisor: value })
                    }
                  />
                </div>
              );
            })()}

            {/* Grado */}
            {(() => {
              const canEdit = canEditEmployeeField("grade");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Grado {canEdit && <span className="text-red-500">*</span>}
                  </label>
                  <AsyncSelect
                    url={`https://localhost:7040/GetGrades`}
                    name="grade"
                    value={formValues?.grade || ""}
                    disabled={!canEdit}
                    required={canEdit}
                    onChange={(value) =>
                      canEdit && setFormValues({ ...formValues, grade: value })
                    }
                  />
                </div>
              );
            })()}

            {/* Proyecto */}
            {(() => {
              const canEdit = canEditEmployeeField("project");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Proyecto{" "}
                    {canEdit && <span className="text-red-500">*</span>}
                  </label>
                  <AsyncSelectFreeText
                    url={`https://localhost:7040/GetProjectsByExactus`}
                    name="project"
                    value={formValues?.project || ""}
                    disabled={!canEdit}
                    required={canEdit}
                    onChange={(value) =>
                      canEdit &&
                      setFormValues({ ...formValues, project: value })
                    }
                  />
                </div>
              );
            })()}
            {/*Nombre de area*/}
            {(() => {
              const canEdit = canEditEmployeeField("areaName");

              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nombre del Área{" "}
                    {canEdit && <span className="text-red-500">*</span>}
                  </label>

                  <AsyncSelect
                    url={`https://localhost:7040/getDepartments`}
                    name="areaName"
                    value={formValues?.areaName || ""}
                    disabled={!canEdit}
                    required={canEdit}
                    customNameParam="descriptionDepartamento"
                    onChange={(value) => {
                      if (!canEdit) return;
                      setFormValues({ ...formValues, areaName: value });
                    }}
                  />
                </div>
              );
            })()}
            {/*Centro Costo*/}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Centro de Costo
              </label>

              <input
                value={"centro costo(implementar-nueva base de datos)"}
                disabled
                className="border rounded-lg w-full py-2.5 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>
            {/* Nombre */}
            {(() => {
              const canEdit = canEditEmployeeField("fullName");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nombre {canEdit && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    name="fullName"
                    value={formValues?.fullName || ""}
                    disabled={!canEdit}
                    required={canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) =>
                      canEdit &&
                      setFormValues({ ...formValues, fullName: e.target.value })
                    }
                  />
                </div>
              );
            })()}

            {/* Exactus ID */}
            {(() => {
              const canEdit = canEditEmployeeField("exactusId");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Exactus ID
                  </label>
                  <input
                    type="number"
                    name="exactusId"
                    value={formValues?.exactusId || ""}
                    disabled={!canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) =>
                      canEdit &&
                      setFormValues({
                        ...formValues,
                        exactusId: e.target.value,
                      })
                    }
                  />
                </div>
              );
            })()}
            {/*Career settings */}
            {(() => {
              const canEdit = canEditEmployeeField("careerSettingsId");

              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Career Settings ID
                  </label>

                  <input
                    type="number"
                    name="careerSettingsId"
                    value={formValues?.careerSettingsId || ""}
                    disabled={!canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) => {
                      if (!canEdit) return;
                      setFormValues({
                        ...formValues,
                        careerSettingsId: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            })()}
            {/* Lion Login*/}
            {(() => {
              const canEdit = canEditEmployeeField("lionLogin");

              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Lion Login
                  </label>

                  <input
                    name="lionLogin"
                    value={formValues?.lionLogin || ""}
                    disabled={!canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) => {
                      if (!canEdit) return;
                      setFormValues({
                        ...formValues,
                        lionLogin: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            })()}
            {/*Correo empresa*/}
            {(() => {
              const canEdit = canEditEmployeeField("companyEmail");

              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Correo Empresa
                  </label>

                  <input
                    type="email"
                    name="companyEmail"
                    value={formValues?.companyEmail || ""}
                    disabled={!canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) => {
                      if (!canEdit) return;
                      setFormValues({
                        ...formValues,
                        companyEmail: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            })()}
            {/* Fecha de Ingreso */}
            {(() => {
              const canEdit = canEditEmployeeField("startDate");
              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Fecha de Ingreso
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formValues?.startDate?.split("T")[0] || ""}
                    disabled={!canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) =>
                      canEdit &&
                      setFormValues({
                        ...formValues,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
              );
            })()}
            {/*Fecha de Finalización*/}
            {(() => {
              const canEdit = canEditEmployeeField("endDate");

              return (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Fecha de Finalización
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formValues?.endDate?.split("T")[0] || ""}
                    disabled={!canEdit}
                    className={`border rounded-lg w-full py-2.5 px-4 ${
                      !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                    }`}
                    onChange={(e) => {
                      if (!canEdit) return;
                      setFormValues({ ...formValues, endDate: e.target.value });
                    }}
                  />
                </div>
              );
            })()}
          </div>

          {/* Comentario */}
          {(() => {
            const canEdit = canEditEmployeeField("comment");
            return (
              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2">
                  Comentario
                </label>
                <textarea
                  value={formValues.comment || ""}
                  disabled={!canEdit}
                  className={`border rounded-lg w-full py-2.5 px-4 h-[200px] ${
                    !canEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                  }`}
                  onChange={(e) =>
                    canEdit &&
                    setFormValues({ ...formValues, comment: e.target.value })
                  }
                />
              </div>
            );
          })()}
        </div>
      </div>
      {/* Campo 1: Nombre */}
    </>
  );
}
