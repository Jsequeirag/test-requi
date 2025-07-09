import React from "react";
import AsyncSelect from "../../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../../stores/FormStore.js";
import { useApiSend } from "../../../api/config/customHooks";
import { useApiGet } from "../../../api/config/customHooks.js";
import TextButton from "../../../components/Button/TextButton";
import { ToastContainer, toast } from "react-toastify";
import { getRequestType } from "../../../api/urls/Request.js";
import LoadingModal from "../../../components/LoadingModal/LoadingModal";
import { useNavigate } from "react-router-dom";
import { getLocalStorageKeyValue } from "../../../utils/localstore";
import { createRequests, updateRequests } from "../../../api/urls/Request";
import { useLocation } from "react-router-dom";
export default function RDetailMovimientoLateral() {
  //GLOBAL
  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);
  //reacty-router-dom
  const navigate = useNavigate();
  //localstorage
  const userLogged = getLocalStorageKeyValue("requitool-employeeInfo", "id");
  // ========== 📍 Location ==========
  const location = useLocation();
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
      <LoadingModal
        openModal={isPendingCreateRequest || isPendingUpdateRequest}
        text={
          location.state?.action === "update"
            ? "Actualizando solicitud"
            : "Creando solicitud"
        }
      />
      <h1 className="text-2xl">Detalles de la Acción</h1> {/*renuncia */}
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="ChangeManager"
          >
            Cambia el encargado
          </label>
          <select
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="changeManager"
            value={formValues.changeManager}
            onChange={(e) =>
              setFormValues({
                ...formValues, // It's good practice to spread the previous state
                [e.target.name]: e.target.value,
              })
            }
          >
            <option selected value={""}>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option> <option value={false}>No</option>
          </select>
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="userName"
          >
            Nuevo encargado
          </label>
          <AsyncSelect
            url={`https://localhost:7040/getEmployees`}
            name={"newDominoEffectManager"}
            disabled={
              formValues.changeManager === false ||
              formValues.changeManager === "false"
            }
            customNameParam={"nombre"}
            value={formValues.newDominoEffectManager || ""} // Add this line
          />
        </div>
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="RequiresReplacement"
          >
            Requiere reemplazo
          </label>
          <select
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="requiresReplacement"
            value={formValues.requiresReplacement}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          >
            <option selected value={""}>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option> <option value={false}>No</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 m-5">
          <label
            className="block text-black text-lg font-bold mb-2"
            htmlFor="HiringProcess"
          >
            Requiere proceso de contratación
          </label>
          <select
            className="shadow  border rounded-sm w-full py-2 px-3 text-grey-darker text-lg focus:coutline-input"
            name="hiringProcess"
            value={formValues.hiringProcess}
            onChange={(e) =>
              setFormValues({ ...formValues, [e.target.name]: e.target.value })
            }
          >
            <option selected value={""}>
              Seleccionar una opción
            </option>
            <option value={true}>Sí</option> <option value={false}>No</option>
          </select>
        </div>
      </div>{" "}
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
