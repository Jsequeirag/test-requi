import React, { useEffect } from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet, useApiSend } from "../../../api/config/customHooks.js";
import { useNavigate, useLocation } from "react-router-dom";
import TextButton from "../../../components/Button/TextButton";
import { createRequests, updateRequests } from "../../../api/urls/Request";
import { getLocalStorageKeyValue } from "../../../utils/localstore";
import { ToastContainer, toast } from "react-toastify";
import { getEmployeesbyBoss } from "../../../api/urls/Employee.js";
import LoadingModal from "../../../components/LoadingModal/LoadingModal";

// Ensure you have react-toastify and tailwindcss installed.
// npm install react-toastify
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
// Then configure your tailwind.config.js to scan your files.
// Also, import 'react-toastify/dist/ReactToastify.css' in your main App.js or index.js

export default function RDetailSalida({ closeModel }) {
  // GLOBAL STATE
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  const resetForm = formStore((state) => state.resetForm); // Assuming you have a resetForm action in your store

  // REACT-ROUTER-DOM HOOKS
  const navigate = useNavigate();
  const location = useLocation();

  // LOCAL STORAGE
  const userLogged = getLocalStorageKeyValue("requitool-employeeInfo", "id");

  // API SEND HOOKS (for creating/updating requests)
  const { mutateAsync: createRequest, isPending: isPendingCreateRequest } =
    useApiSend(
      createRequests,
      () => {
        toast.success("Solicitud creada exitosamente.", {
          className: "bg-green-600 text-white",
          progressClassName: "bg-white",
          icon: "🚀",
        });
        navigate("/requisitions");
        resetForm();
      },
      (e) => {
        console.error("Error creating request:", e);
        toast.error(
          "Inconveniente creando la solicitud. Por favor, intente de nuevo.",
          {
            className: "bg-red-600 text-white",
            progressClassName: "bg-white",
            icon: "🚨",
          }
        );
      }
    );

  const { mutateAsync: updateRequest, isPending: isPendingUpdateRequest } =
    useApiSend(
      updateRequests,
      () => {
        toast.success("Solicitud actualizada exitosamente.", {
          className: "bg-green-600 text-white",
          progressClassName: "bg-white",
          icon: "✨",
        });
        navigate("/requisitions");
        resetForm();
      },
      (e) => {
        console.error("Error updating request:", e);
        toast.error(
          "Inconveniente actualizando la solicitud. Por favor, intente de nuevo.",
          {
            className: "bg-red-600 text-white",
            progressClassName: "bg-white",
            icon: "🚨",
          }
        );
      }
    );

  // API GET HOOK (for employees by boss)
  const {
    data: employeesData,
    isLoading: isLoadingEmployeesByBoss,
    isError: isErrorEmployeesByBoss,
    error: employeesByBossError,
  } = useApiGet(
    ["employeesByBoss", formValues?.employeeId],
    () => getEmployeesbyBoss(formValues?.employeeId),
    {
      enabled: !!formValues?.employeeId,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: (e) => {
        console.error("Error fetching employees by boss:", e);
      },
    }
  );

  // Derive state for conditional rendering and disabling
  const isUpdateAction = location.state?.action === "update";
  const requiresReplacement = formValues.requiresReplacement === "true";
  const requiresHiringProcess = formValues.hiringProcess === "true";
  const showHiringProcessFields = requiresReplacement;
  const showNewSupervisorField =
    requiresReplacement && employeesData?.length > 0;
  const isSubmitting = isPendingCreateRequest || isPendingUpdateRequest;

  // Handler for form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formValues,
      userId: userLogged,
    };

    if (isUpdateAction) {
      await updateRequest(payload);
    } else {
      await createRequest(payload);
    }
  };

  // Effect to reset relevant fields when 'requiresReplacement' changes
  useEffect(() => {
    if (!requiresReplacement) {
      setFormValues((prev) => ({
        ...prev,
        hiringProcess: "",
        processType: "",
        asignEmployees: "",
      }));
    }
  }, [requiresReplacement, setFormValues]);

  return (
    <form
      onSubmit={onSubmit}
      className="p-6 bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8 dark:bg-gray-800"
    >
      <ToastContainer position="bottom-right" theme="dark" />

      {/* Loading Modal */}
      <LoadingModal
        openModal={isSubmitting}
        text={
          isUpdateAction ? "Actualizando solicitud..." : "Creando solicitud..."
        }
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4 dark:text-gray-100 dark:border-gray-700">
        Detalles de la Acción
      </h1>

      {/* Main Grid Container for Form Fields */}
      {/* Consistent with Salida component: 1 col on mobile, 2 on md, 3 on lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Field: Requiere reemplazo */}
        {/*<div>
          <label
            htmlFor="requiresReplacement"
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
          >
            Requiere reemplazo{" "}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <select
            id="requiresReplacement"
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            name="requiresReplacement"
            value={formValues.requiresReplacement || ""}
            required
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">Seleccionar una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>*/}
        {/* Field: Requiere proceso de contratación */}
        {/*<div
          className={
            !showHiringProcessFields ? "opacity-50 pointer-events-none" : ""
          }
        >
          <label
            htmlFor="hiringProcess"
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
          >
            Requiere proceso de contratación{" "}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <select
            id="hiringProcess"
            className="border border-gray-300 rounded-lg w-full py-2.5 px-4 text-base
                       bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm
                       dark:bg-gray-750 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            name="hiringProcess"
            required={showHiringProcessFields}
            value={formValues.hiringProcess || ""}
            disabled={!showHiringProcessFields}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">Seleccionar una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>*/}
        {/* Field: Tipo de proceso */}
        {/* <div
          className={
            !showHiringProcessFields || !requiresHiringProcess
              ? "opacity-50 pointer-events-none"
              : ""
          }
        >
          <label
            htmlFor="processType"
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
          >
            Tipo de proceso{" "}
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <AsyncSelect
            url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getRequisitionFeature?requisitionFeatureId=4`}
            name={"processType"}
            id={"processType"}
            disabled={!showHiringProcessFields || !requiresHiringProcess}
            value={formValues.processType || ""}
            required={showHiringProcessFields && requiresHiringProcess}
            placeholder={
              !showHiringProcessFields || !requiresHiringProcess
                ? "Selección deshabilitada"
                : "Seleccione un tipo de proceso"
            }
            className="w-full text-base" // Consistent with Salida
          />
        </div>*/}
        {/* Field: Nuevo Supervisor (conditionally rendered and styled) */}
        <div
          className={`lg:col-span-3 ${
            !showNewSupervisorField && isLoadingEmployeesByBoss
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <label
            htmlFor="asignEmployees"
            className="block text-gray-700 text-sm font-semibold mb-2 dark:text-gray-300"
          >
            Nuevo Supervisor
            <span className="text-red-500 font-bold dark:text-red-400">*</span>
          </label>
          <div className="relative">
            {isLoadingEmployeesByBoss && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-0 bottom-0">
                <svg
                  className="animate-spin h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            <AsyncSelect
              url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getEmployeesBySupervisorRole`}
              name={"asignEmployees"}
              id={"asignEmployees"}
              customNameParam={"nombre"}
              disabled={showNewSupervisorField}
              value={formValues.asignEmployees || ""}
              required={showNewSupervisorField}
              placeholder={
                isLoadingEmployeesByBoss
                  ? "Cargando posibles supervisores..."
                  : showNewSupervisorField
                  ? "Seleccione un nuevo supervisor"
                  : "No hay personal para reasignar o no requiere reemplazo"
              }
              className="w-full text-base" // Consistent with Salida
            />
          </div>

          {employeesData?.length > 0 && (
            <p className="text-blue-600 text-sm mt-3 dark:text-blue-400">
              <b>Personal a cargo:</b> Se ha detectado personal bajo el empleado
              saliente. Por favor, seleccione un nuevo supervisor para este
              personal.
            </p>
          )}
          {requiresReplacement &&
            !isLoadingEmployeesByBoss &&
            !employeesData?.length &&
            formValues?.employeeId && (
              <p className="text-orange-500 text-sm mt-3 dark:text-orange-300">
                No se encontró personal directo a cargo del empleado saliente.
              </p>
            )}
          {isErrorEmployeesByBoss && (
            <p className="text-red-500 text-sm mt-3 dark:text-red-400">
              Error al cargar personal a cargo:{" "}
              {employeesByBossError?.message || "Detalles desconocidos."}
            </p>
          )}
        </div>
      </div>

      {/* Form Submission Button */}
      <div className="flex justify-center mt-10">
        <TextButton
          text={isUpdateAction ? "Actualizar Solicitud" : "Crear Solicitud"}
          type={"submit"}
          disabled={isSubmitting}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
        />
      </div>
    </form>
  );
}
