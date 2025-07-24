import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import MenuCard from "../../components/MenuCard/MenuCard.jsx";
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../../utils/localstore";
import formStore from "../../../stores/FormStore.js";
import { LayoutPanelTop, UserLock } from "lucide-react";
export default function ConfigurationDashboard() {
  const setForm = formStore((state) => state.setForm);
  const navigate = useNavigate();
  const options = [
    {
      title: "Roles y permisos",
      description:
        "Asignar roles a empleados para que puedan acceder a determinadas secciones del sistema",
      path: "/rolesAdministration",
      icon: <UserLock className="w-8 h-8  text-blue-600  dark:text-blue-400" />,
    },
    {
      title: "Asignación de departamentos",
      description: "Asignar departamentos a supervivisores",
      path: "/departmentAdministration",
      icon: (
        <LayoutPanelTop className="w-8 h-8  mr-3 text-green-600  dark:text-green-400" />
      ),
    },
  ];

  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 tracking-tight">
          Configuración
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
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
