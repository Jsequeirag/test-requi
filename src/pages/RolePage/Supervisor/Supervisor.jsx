import { useEffect } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { removeLocalStorageItem } from "../../../utils/localstore.js";
import formStore from "../../../../stores/FormStore.js";
import PendingRequisitionStore from "../../../../stores/PendingRequisitionStore.js";
import { Role } from "../../../contansts/roles.jsx";
import MenuCard from "../../../components/MenuCard/MenuCard.jsx";
import { List, FileText } from "lucide-react";

export default function Supervisor() {
  const setForm = formStore((state) => state.setForm);

  // 🔥 OBTENER TODAS LAS REQUISICIONES DEL STORE
  const requisitions = PendingRequisitionStore((s) => s.requisitions);

  // 🔥 CONTAR LAS SOLICITUDES QUE LE PERTENECEN AL SUPERVISOR (roleId = 1)
  const supervisorRequestsCount = requisitions.filter(
    (req) => req.roleId === Role.Supervisor
  ).length;

  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
  }, []);

  const options = [
    {
      title: "Crear Requisición",
      description: "Podrás gestionar la creación de Requisiciones",
      path: "/newRequisition",
      icon: <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Ver Requisiciones",
      description: "Podrás ver el listado de requisiciones",
      path: "/requisitions",
      icon: <List className="w-8 h-8 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Solicitudes",
      description: "Aquí podrás ver información de las solicitudes",
      path: "/supervisorRequest",
      requestCount: supervisorRequestsCount, // 🔥 DINÁMICO
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 tracking-tight">
          Dashboard
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          {options.map((option, index) => (
            <MenuCard
              key={index}
              title={option.title}
              description={option.description}
              path={option.path}
              requestCount={option.requestCount}
              icon={option.icon}
              bgColor={option.bgColor}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
