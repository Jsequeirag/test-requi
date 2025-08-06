import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Asegúrate de que la ruta sea correcta
import RequestItem from "./RequestItem"; // Asegúrate de que la ruta sea correcta

import Layout from "../../components/Layout/Layout";
// Datos de prueba para las solicitudes hija (modificados para que parezcan 'requests')
const childRequestsData = [
  {
    id: "001",
    parentId: "001",
    state: "pendiente",
    createdDate: new Date(),
    user: { name: "Quiros Alvarado Erick" },
  },
  {
    id: "002",
    parentId: "001",
    state: "aprobado",
    createdDate: new Date(),
    user: { name: "Quiros Alvarado Erick" },
  },
  {
    id: "003",
    parentId: "002",
    state: "pendiente",
    createdDate: new Date(),
    user: { name: "Quiros Alvarado Erick" },
  },
  {
    id: "004",
    parentId: "003",
    state: "rechazado",
    createdDate: new Date(),
    user: { name: "Quiros Alvarado Erick" },
  },
  {
    id: "005",
    parentId: "003",
    state: "pendiente",
    createdDate: new Date(),
    user: { name: "Quiros Alvarado Erick" },
  },
];
const PayrollRequest = () => {
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [expandedChildId, setExpandedChildId] = useState(null);

  const handleParentSelect = (parentId) => {
    setSelectedParentId(parentId);
    setExpandedChildId(null); // Resetear cualquier hijo expandido al cambiar de padre
  };

  const getChildRequests = (parentId) => {
    return childRequestsData.filter((child) => child.parentId === parentId);
  };

  const handleExpandChild = (childId) => {
    setExpandedChildId(childId === expandedChildId ? null : childId);
  };

  return (
    <Layout>
      <div className="flex h-screen">
        <Sidebar onParentSelect={handleParentSelect} />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-4">
            Lista de requisiciones
          </h1>
          {selectedParentId ? (
            <div>
              {getChildRequests(selectedParentId).map((child) => (
                <RequestItem
                  key={child.id}
                  request={child}
                  expandedRequest={expandedChildId}
                  handleExpand={handleExpandChild}
                />
              ))}
              {getChildRequests(selectedParentId).length === 0 && (
                <p className="text-gray-600 dark:text-gray-400">
                  No hay detalles para esta solicitud.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Selecciona una solicitud de la barra lateral para ver sus
              detalles.
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default PayrollRequest;
