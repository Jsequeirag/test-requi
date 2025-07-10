import { React, useEffect } from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiGet } from "../../../api/config/customHooks.js";
import { useNavigate } from "react-router-dom";
import TextButton from "../../../components/Button/TextButton";
import { useApiSend } from "../../../api/config/customHooks";
import { createRequests, updateRequests } from "../../../api/urls/Request";
import { getLocalStorageKeyValue } from "../../../utils/localstore";
import { ToastContainer, toast } from "react-toastify";
import { getEmployeesbyBoss } from "../../../api/urls/Employee.js";
import LoadingModal from "../../../components/LoadingModal/LoadingModal";
import { useLocation } from "react-router-dom";
export default function RDetailSalida({ closeModel }) {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  //reacty-router-dom
  const navigate = useNavigate();
  // ========== 📍 Location ==========
  const location = useLocation();
  //localstorage
  const userLogged = getLocalStorageKeyValue("requitool-employeeInfo", "id");
  //submit
  const {
    mutateAsync: createRequest,
    isPending: isPendingCreateRequest,
    isLoading: isLoadingCreateRequest,
  } = useApiSend(
    createRequests,
    () => {
      toast.success("Solicitud creada", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
      navigate("/requisitions");
    },
    (e) => {
      console.log(e);
      toast.error("Inconveniente Creando la solicitud", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
    }
  );
  const {
    mutateAsync: updateRequest,
    isPending: isPendingUpdateRequest,
    isLoading: isLoadingUpdateRequest,
  } = useApiSend(
    updateRequests,
    () => {
      toast.success("Solicitud creada", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
      navigate("/requisitions");
    },
    (e) => {
      console.log(e);
      toast.error("Inconveniente Creando la solicitud", {
        className: "bg-grey-800",
        progressClassName: "bg-white",
      });
    }
  );
  //onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (location.state?.action === "update") {
      return await updateRequest({
        ...formValues,
        ["userId"]: userLogged,
      });
    }
    return await createRequest({
      ...formValues,
      ["userId"]: userLogged,
    });
  };

  var {
    data: employeesData,
    isSuccess: employeesByBossIsSuccess,
    isLoading,
  } = useApiGet(
    ["employeesByBoss"],
    () => getEmployeesbyBoss(formValues?.employeeId),
    {
      // <- SOLO ejecuta si hay ID
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <ToastContainer position="bottom-right" theme="dark" />
      <LoadingModal
        openModal={isPendingCreateRequest || isPendingUpdateRequest}
        text={
          location.state?.action === "update"
            ? "Actualizando solicitud"
            : "Creando solicitud"
        }
      />
      <h1 className="text-2xl">Detalles de la Acción</h1>
      {/*renuncia */}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="RequiresReplacement"
          >
            Requiere reemplazo
          </label>
          <select
            className="shadow border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="requiresReplacement"
            value={formValues.requiresReplacement} // Add this line
            required
            onChange={(e) =>
              setFormValues({
                ...formValues, // It's good practice to spread the previous state
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">Seleccionar una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>{" "}
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="HiringProcess"
          >
            Requiere proceso de contratación
          </label>
          <select
            className="shadow border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            disabled={formValues.requiresReplacement !== "true"}
            name="hiringProcess"
            required
            value={formValues.hiringProcess} // Add this line
            onChange={(e) =>
              setFormValues({
                ...formValues, // It's good practice to spread the previous state
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">Seleccionar una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="HiringProcess"
          >
            Tipo de proceso
          </label>
          <div className="">
            <>
              <AsyncSelect
                url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getRequisitionFeature?requisitionFeatureId=4`}
                name={"processType"}
                disabled={formValues.requiresReplacement !== "true"}
                value={formValues.processType || ""}
                required={!formValues.requiresReplacement !== "true"}
              />
            </>
          </div>
        </div>
      </div>{" "}
      <div className="flex">
        <div className="w-[75%] m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="HiringProcess"
          >
            Nuevo Supervisor
          </label>
          <div className="">
            {
              <>
                <AsyncSelect
                  url={`https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net/getEmployees`}
                  name={"asignEmployees"}
                  customNameParam={"nombre"}
                  disabled={!employeesData?.length > 0}
                  value={formValues.asignEmployees || ""}
                  required={!formValues.requiresReplacement !== "true"}
                />
              </>
            }
          </div>

          <>
            {employeesData?.length > 0 && (
              <p className="text-blue-600 mt-1">
                <b>Personal a cargo</b>, por favor seleccione un nuevo
                supervisor para el personal
              </p>
            )}
          </>
        </div>
      </div>
      <div className="flex w-100 justify-center">
        <TextButton
          text={
            location.state?.action === "update"
              ? "Actualizar solicitud"
              : "Crear solicitud"
          }
          type={"submit"}
        />
      </div>
    </form>
  );
}
