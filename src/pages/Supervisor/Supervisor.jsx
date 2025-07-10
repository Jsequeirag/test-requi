import { React, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import { removeLocalStorageItem } from "../../utils/localstore.js"; // Ensure this path is correct
import formStore from "../../../stores/FormStore.js"; // Ensure this path is correct
import MenuCard from "../../components/MenuCard/MenuCard.jsx";
import { List, FileText } from "lucide-react";
import { icon } from "@fortawesome/fontawesome-svg-core";
export default function Supervisor() {
  const setForm = formStore((state) => state.setForm);
  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
  }, []);
  const options = [
    {
      title: "Crear Requisición",
      description: "Podras gestionar la creacion de Requisiciones",
      path: "/newRequisition",
      icon: <FileText className="w-8 h-8 text-white" />,
    },
    {
      title: "Ver Requisiciones",
      description: "Podras ver el listado de requisiciones",
      path: "/requisitions",
      icon: <List className="w-8 h-8 text-white" />,
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
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
