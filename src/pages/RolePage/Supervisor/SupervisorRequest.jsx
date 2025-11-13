import React, { useState, useEffect } from "react"; // Importar useEffect
import Sidebar from "./SupervisorSidebar"; // Asegúrate de que la ruta sea correcta
import RequestItem from "./SupervisorRequestItem"; // Asegúrate de que la ruta sea correcta
import TextButton from "../../../components/Button/TextButton";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
export default function SupervisorRequest() {
  const navigate = new useNavigate();
  const [childRequestsData, setChildRequestsData] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [expandedChildId, setExpandedChildId] = useState(null);
  const [showChildRequests, setShowChildRequests] = useState(false); // Nuevo estado para controlar la animación

  const handleParentSelect = (parentId) => {
    setSelectedParentId(parentId);
    setExpandedChildId(null); // Resetear cualquier hijo expandido al cambiar de padre
    setShowChildRequests(false); // Ocultar los hijos inmediatamente al cambiar de padre
  };

  // Efecto para controlar la animación de aparición de las solicitudes hija
  useEffect(() => {
    if (childRequestsData && childRequestsData.length > 0) {
      // Retrasar la aparición un poco para que sea suave después de que cambie el padre
      const timer = setTimeout(() => {
        setShowChildRequests(true);
      }, 100); // Pequeño retraso
      return () => clearTimeout(timer);
    } else {
      setShowChildRequests(false); // Si no hay datos, asegurar que estén ocultos
    }
  }, [childRequestsData]); // Este efecto se ejecuta cada vez que childRequestsData cambia

  const getChildRequests = (parentId) => {
    try {
      // No necesitamos filtrar aquí si setChildRequestsData ya nos da los correctos
      // asumimos que setChildRequestsData ya proporciona las requisiciones del padre seleccionado
      return childRequestsData; // Si childRequestsData ya viene filtrado por el Sidebar
    } catch (e) {
      console.error("Error al obtener child requests:", e);
      return [];
    }
  };

  return (
    <Layout>
      <div className="flex h-full">
        <Sidebar
          onParentSelect={handleParentSelect}
          setChildRequestsData={setChildRequestsData}
        />
        <main
          className="flex-1 p-6 flex flex-col"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="flex items-center border-b p-4 mx-2">
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            <TextButton
              onClick={() => {
                navigate("/payroll");
              }}
              text={"Atrás"}
            />
            <h1 className="px-9 text-3xl p-4">
              Lista de Requisiciones - Supervisor
            </h1>
          </div>
          {selectedParentId ? (
            <div className="flex-1 overflow-y-auto space-y-4 mt-4">
              {/* Espaciado entre items */}
              {getChildRequests(selectedParentId).map((child, index) => (
                <div
                  key={child.id}
                  className={`transition-all duration-300 transform ease-out
                                ${
                                  showChildRequests
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-4"
                                }`}
                  style={{
                    transitionDelay: showChildRequests
                      ? `${index * 75}ms`
                      : "0ms",
                  }}
                >
                  <RequestItem
                    request={child}
                    expandedRequest={expandedChildId}
                  />
                </div>
              ))}
              {getChildRequests(selectedParentId)?.length === 0 && (
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">
                  No hay detalles para esta solicitud.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-1 text-center">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Selecciona una solicitud de la barra lateral para ver sus
                detalles.
              </p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
