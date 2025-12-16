import { useEffect } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import { removeLocalStorageItem } from "../../../utils/localstore.js";
import formStore from "../../../../stores/FormStore.js";
import PendingRequisitionStore from "../../../../stores/PendingRequisitionStore.js";
import { Role } from "../../../contansts/roles.jsx";
import MenuCard from "../../../components/MenuCard/MenuCard.jsx";

export default function RecluitmentDashboard() {
  const setForm = formStore((state) => state.setForm);

  // 🔥 TRAER TODAS LAS REQUISICIONES DEL STORE
  const requisitions = PendingRequisitionStore((s) => s.requisitions);

  // 🔥 CONTAR REQUISICIONES DE RECLUTAMIENTO (roleId = 2)
  const recruitmentRequestsCount = requisitions.filter(
    (req) => req.roleId === Role.Reclutamiento
  ).length;

  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
  }, []);

  const options = [
    {
      title: "Solicitudes",
      description: "Aquí podrás ver información de las solicitudes",
      path: "/recruitmentRequests",
      requestCount: recruitmentRequestsCount, // 🔥 DINÁMICO
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 tracking-tight">
          Panel de Reclutamiento
        </h1>

        <div className="flex flex-wrap justify-center gap-8">
          {options.map((option, index) => (
            <MenuCard
              key={index}
              title={option.title}
              description={option.description}
              path={option.path}
              requestCount={option.requestCount}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
