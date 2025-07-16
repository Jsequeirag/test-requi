import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx"; // Ensure this path is correct
import { removeLocalStorageItem } from "../../utils/localstore.js"; // Ensure this path is correct
import formStore from "../../../stores/FormStore.js"; // Ensure this path is correct
import MenuCard from "../../components/MenuCard/MenuCard.jsx";
export default function FinanceDasahboard() {
  const setForm = formStore((state) => state.setForm);

  useEffect(() => {
    removeLocalStorageItem("requitool-requisition");
    setForm({});
    // Here you could add logic to fetch the actual number of requests
  }, []);
  const options = [
    {
      title: "Solicitudes",
      description: "Aquí podras ver información de las solicitudes",
      path: "/financeRequests",
      requestCount: 4,
    },
  ];
  return (
    <Layout>
      {/* Main content area with padding and centering */}
      <div className=" flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
        {/* Adjust min-h if your Layout has a fixed header/footer */}
        {/* Page Title - Large and bold, similar to macOS app titles */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 tracking-tight">
          Panel de Finanzas
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
