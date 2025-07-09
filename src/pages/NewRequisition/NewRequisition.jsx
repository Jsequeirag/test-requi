import { useEffect, useReducer, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import TextButton from "../../components/Button/TextButton";
import { initialState, reducer } from "./Reducer";
import { createRequests, updateRequests } from "../../api/urls/Request";
import AsyncSelect from "../../components/AsyncComponents/AsyncSelect.jsx";
import formStore from "../../../stores/FormStore.js";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageItem,
  getLocalStorageKeyValue,
} from "../../utils/localstore";
import {
  ChevronLeft,
  Info,
  Layers,
  User,
  FileText,
  CheckCircle,
  Briefcase,
  ClipboardList,
  XCircle,
} from "lucide-react";

import {
  Entrada,
  MovimientoLateral,
  Promocion,
  Salida,
  CierrePlaza,
} from "./RequisitionForm/RequisitionForm.jsx";
import {
  RDetailMovimientoLateral,
  RDetailPromocion,
  RDetailSalida,
} from "./RequisitionDetail/RequisitionDetail.jsx";
import EmployeeInfo from "./EmployeeInfo/EmployeeInfo.jsx";
import ModalRequisitionDetails from "../../components/ModalRequisitionDetails/ModalRequisitionDetails.jsx";
import { useApiSend } from "../../api/config/customHooks";
import { toast } from "react-toastify";

function NewRequisition() {
  const navigate = useNavigate();
  const location = useLocation();

  const formValues = formStore((state) => state.formValues);
  const setFormValues = formStore((state) => state.setFormValues);

  const [state, dispatcher] = useReducer(reducer, initialState);

  const userLogged = getLocalStorageKeyValue("requitool-employeeInfo", "id");

  const {
    mutateAsync: createRequisition,
    isPending: isPendingCreateRequisition,
  } = useApiSend(
    createRequests,
    () => {
      toast.success("Solicitud creada exitosamente!", {
        className: "bg-green-600 text-white",
        progressClassName: "bg-white",
      });
      navigate("/requisitions");
    },
    (e) => {
      console.error("Error al crear la solicitud:", e);
      toast.error("Error al crear la solicitud", {
        className: "bg-red-600 text-white",
        progressClassName: "bg-white",
      });
    }
  );

  const {
    mutateAsync: updateRequisition,
    isPending: isPendingUpdateRequisition,
  } = useApiSend(
    updateRequests,
    () => {
      toast.success("Solicitud actualizada exitosamente!", {
        className: "bg-green-600 text-white",
        progressClassName: "bg-white",
      });
      navigate("/requisitions");
    },
    (e) => {
      console.error("Error al actualizar la solicitud:", e);
      toast.error("Error al actualizar la solicitud", {
        className: "bg-red-600 text-white",
        progressClassName: "bg-white",
      });
    }
  );

  useEffect(() => {
    if (location.state?.action === "update") {
      const requisition = location.state.requisition;
      if (requisition) {
        setFormValues(requisition);
      } else {
        const localData = getLocalStorageItem("requitool-requisition");
        if (localData) {
          setFormValues(JSON.parse(localData));
        }
      }
    }
  }, [location.state, setFormValues]);

  const onSubmitEntradaRequest = async () => {
    alert("asd");
    if (location.state?.action === "create") {
      await createRequisition({
        ...formValues,
        userId: userLogged,
      });
    }
    if (location.state?.action === "update") {
      await updateRequisition({
        ...formValues,
        userId: userLogged,
      });
    }
  };

  const switchRDetail = (requestTypeId) => {
    switch (requestTypeId) {
      case 1: // Salida
        return (
          <RDetailSalida
            closeModel={() => dispatcher({ type: "SET_OPEN_MODAL" })}
          />
        );
      case 3: // Promoción
        return <RDetailPromocion />;
      case 4: // Movimiento Lateral
        return <RDetailMovimientoLateral />;
      default:
        return null;
    }
  };

  const createNewRequest = () => {
    if (formValues?.requestTypeId === 2 || formValues?.requestTypeId === 5) {
      return onSubmitEntradaRequest();
    }
    dispatcher({ type: "SET_OPEN_MODAL" });
  };

  const updateRequest = () => {
    if (formValues?.requestTypeId === 2 || formValues?.requestTypeId === 5) {
      return onSubmitEntradaRequest();
    }
    dispatcher({ type: "SET_OPEN_MODAL" });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (location.state?.action === "update") {
      updateRequest();
    } else if (location.state?.action === "create") {
      createNewRequest();
    }
  };

  const getRequestTypeIcon = (requestTypeId) => {
    switch (requestTypeId) {
      case 1: // Salida
        return <XCircle className="w-6 h-6" />;
      case 2: // Entrada
        return <Briefcase className="w-6 h-6" />;
      case 3: // Promoción
        return <ClipboardList className="w-6 h-6" />;
      case 4: // Movimiento Lateral
        return <ClipboardList className="w-6 h-6" />;
      case 5: // Cierre de Plaza
        return <XCircle className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <Layout>
      <ModalRequisitionDetails
        openModal={state.openModal}
        setOpenModal={() => dispatcher({ type: "SET_OPEN_MODAL" })}
        childrenComponent={switchRDetail(formValues.requestTypeId)}
      />

      <LoadingModal
        openModal={isPendingCreateRequisition || isPendingUpdateRequisition}
        text={
          location.state?.action === "update"
            ? "Actualizando solicitud..."
            : "Creando solicitud..."
        }
      />

      {/* Contenedor principal de la página: Ahora con fondo y colores de texto para Dark Mode */}
      <div className="w-full  mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Cabecera de la página */}
        <div className="flex items-center justify-between mb-6">
          <a
            href="/home"
            className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            <TextButton text={"Atrás"} className="p-0 text-lg font-medium" />
          </a>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Formulario de Requisición {JSON.stringify(formValues)}
          </h1>
          <div className="w-auto"></div>
        </div>

        {/* Contenedor principal del formulario (la "tarjeta" grande): Colores ajustados para Dark Mode */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={onSubmit}>
            {/* Sección: Tipo de Solicitud - Colores ajustados para Dark Mode */}
            <div className="group mb-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 shadow-sm dark:bg-blue-950/50 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3 text-blue-600 dark:bg-blue-900 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Layers className="w-6 h-6" />
                </div>
                Tipo de solicitud
              </h2>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                  <label
                    className="block text-gray-800 dark:text-gray-200 text-lg font-semibold mb-2"
                    htmlFor="requestTypeId"
                  >
                    Acción{" "}
                    <span className="text-red-500 font-bold dark:text-red-400">
                      *
                    </span>
                  </label>
                  <AsyncSelect
                    url={`https://localhost:7040/getRequestType/${
                      location.state?.action === "update" &&
                      formValues?.requestTypeId !== 1
                        ? true
                        : false
                    }`}
                    name={"requestTypeId"}
                    value={formValues?.requestTypeId || ""}
                    // Nota: Si AsyncSelect es un componente custom, deberías asegurarte
                    // de que sus estilos internos también soporten el dark mode
                    // (ej. color de fondo, texto del dropdown, etc.).
                  />
                  {!formValues?.requestTypeId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500 flex items-center">
                      <Info className="w-4 h-4 mr-1" /> Este campo es requerido.
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-4">
                  {/* Espacio o más campos */}
                </div>
              </div>
            </div>

            {/* Sección: Información del Empleado (condicional) - Colores ajustados para Dark Mode */}
            {formValues?.requestTypeId !== 2 && (
              <div className="group mb-8 p-6 bg-green-50/50 rounded-xl border border-green-100 shadow-sm dark:bg-green-950/50 dark:border-green-800">
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-3 text-green-600 dark:bg-green-900 dark:text-green-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <User className="w-6 h-6" />
                  </div>
                  Información del Empleado
                </h2>
                <EmployeeInfo />
              </div>
            )}

            {/* Sección: Información de Acción (condicional) - Colores ajustados para Dark Mode */}
            {formValues?.requestTypeId && (
              <div className="group mb-8 p-6 bg-purple-50/50 rounded-xl border border-purple-100 shadow-sm dark:bg-purple-950/50 dark:border-purple-800">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                  <div className="p-2 rounded-full bg-purple-100 mr-3 text-purple-600 dark:bg-purple-900 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    {getRequestTypeIcon(formValues.requestTypeId)}
                  </div>
                  Información de Acción
                </h2>
                {/* Renderizado de formularios específicos de acción */}
                {formValues?.requestTypeId === 1 && <Salida />}
                {formValues?.requestTypeId === 2 && <Entrada />}
                {formValues?.requestTypeId === 3 && <Promocion />}
                {formValues?.requestTypeId === 4 && <MovimientoLateral />}
                {formValues?.requestTypeId === 5 && <CierrePlaza />}
              </div>
            )}

            {/* Botón de envío - Colores ajustados para Dark Mode */}
            <div className="w-full flex justify-end items-center border-t border-gray-200 pt-6 mt-8 dark:border-gray-700">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl
                           transition-all duration-300 shadow-md hover:shadow-lg
                           flex items-center justify-center space-x-2
                           focus:outline-none focus:ring-4 focus:ring-blue-300/50
                           dark:bg-blue-700 dark:hover:bg-blue-800 dark:text-gray-100 dark:focus:ring-blue-600/50"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>
                  {location.state?.action === "update"
                    ? "Actualizar Solicitud"
                    : "Crear Solicitud"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewRequisition;
