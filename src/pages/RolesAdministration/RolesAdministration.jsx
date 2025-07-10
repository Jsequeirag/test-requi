import { useState, useMemo } from "react"; // useMemo se mantiene en la importación, aunque no se use directamente aquí
import Roles from "../RolesAdministration/Roles";
import RoleEmployee from "../RolesAdministration/RoleEmployee";
import TextButton from "../../components/Button/TextButton";
import Layout from "../../components/Layout/Layout";
// Importar motion de framer-motion si deseas animaciones de transición entre pestañas
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { getRoles, deleteRoleById } from "../../api/urls/roles";
export default function RolesAdministration() {
  // Estado para manejar la pestaña activa: 'employeeRoles' o 'systemRoles'
  const [activeTab, setActiveTab] = useState("employeeRoles");

  return (
    <Layout>
      <div className="">
        <div className="border-b bg-white rounded-sm  h-full">
          <div className="p-4 mx-2 justify-between">
            <div className="flex items-center p-4 mx-2">
              <a
                href="/ConfigurationDashboard"
                className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                <TextButton
                  text={"Atrás"}
                  className="p-0 text-lg font-medium"
                />
              </a>
              <h1 className="px-9 text-3xl p-4"> Administracion de Roles</h1>
              <h1 className="px-9 text-3xl p-4"></h1>
            </div>

            {/* Navegación por Pestañas */}
            {/* Nueva sección para las pestañas */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                {/* Botón de Pestaña: Asignación de Roles a Empleados */}
                <button
                  onClick={() => setActiveTab("employeeRoles")}
                  className={`
                  ${
                    activeTab === "employeeRoles"
                      ? "border-[#bdab78] text-[#bdab78] font-semibold" // Estilos activos con color de tu marca
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" // Estilos inactivos
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 text-lg transition-colors duration-200 focus:outline-none
                `}
                >
                  Asignación de Roles a Empleados
                </button>
                {/* Botón de Pestaña: Gestión de Roles del Sistema */}
                <button
                  onClick={() => setActiveTab("systemRoles")}
                  className={`
                  ${
                    activeTab === "systemRoles"
                      ? "border-[#bdab78] text-[#bdab78] font-semibold" // Estilos activos
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" // Estilos inactivos
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 text-lg transition-colors duration-200 focus:outline-none
                `}
                >
                  Gestión de Roles del Sistema
                </button>
              </nav>
            </div>

            {/* Contenido de la Pestaña Activa */}
            {/* Se elimina el `flex flex-col items-center` del contenedor anterior, ya que cada componente de pestaña se encargará de su propio layout. */}
            {/* Los componentes `RoleEmployee` y `Roles` se renderizan condicionalmente dentro de un `motion.div` para animaciones */}
            <div className="p-6">
              {activeTab === "employeeRoles" && (
                <motion.div
                  key="employeeRoles" // Clave única para que Framer Motion detecte el cambio y anime
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoleEmployee />
                </motion.div>
              )}
              {activeTab === "systemRoles" && (
                <motion.div
                  key="systemRoles" // Clave única para que Framer Motion detecte el cambio y anime
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Roles />
                </motion.div>
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </Layout>
  );
}
