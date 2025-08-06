import React from "react";
import Layout from "../../components/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons"; // Ejemplo de icono de finanzas
import { useNavigate } from "react-router-dom";

export default function FinanceDashboard() {
  const navigate = new useNavigate();

  return (
    <Layout>
      <div className="flex justify-center mt-6">
        <h1 className="text-3xl font-semibold text-indigo-500text-gray-800 dark:text-gray-100">
          Finanzas
        </h1>
      </div>
      <div className="m-10 flex space-x-4 justify-center">
        {" "}
        {/* Usamos space-x-4 para la separación y justify-center para centrar */}
        <div
          onClick={() => navigate("/financialReports")} // Reemplaza con la ruta correcta
          className="flex justify-center flex-col items-center w-[300px] h-[150px] rounded-md shadow-lg border border-gray-300 cursor-pointer bg-white hover:shadow-md transition duration-200"
        >
          <FontAwesomeIcon
            icon={faMoneyBillTrendUp} // Icono de finanzas
            className="mt-2 text-indigo-500"
            size="2x"
          />
          <h1 className="mt-2 font-semibold text-xl text-gray-900">
            Solicitudes
          </h1>
          {/* Aquí podrías añadir un contador o indicador si es necesario */}
        </div>
        {/* Puedes añadir más botones/tarjetas aquí para otras funcionalidades de finanzas */}
      </div>
    </Layout>
  );
}
