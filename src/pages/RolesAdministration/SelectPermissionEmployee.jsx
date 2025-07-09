import React, { useState } from "react";

// Componente TextButton simulado
const TextButton = ({
  bgColor,
  hoverBgColor,
  textColor,
  hoverTextColor,
  textSize,
  otherProperties,
  text,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${bgColor} ${hoverBgColor} ${textColor} ${hoverTextColor} ${textSize} ${otherProperties} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default function RolesComponent() {
  // Datos quemados de ejemplo - PERMISOS GENERALES
  const generalRoles = [
    { id: 1, name: "Lectura" },
    { id: 2, name: "Editar" },
    { id: 3, name: "Eliminar" },
    { id: 4, name: "Crear" },
    { id: 5, name: "Exportar" },
    { id: 6, name: "Importar" },
    { id: 7, name: "Configurar" },
    { id: 8, name: "Aprobar" },
  ];

  // Datos quemados de ejemplo - PERMISOS PAYROLL
  const payrollRoles = [
    { id: 101, name: "Ver Nómina", category: "payroll" },
    { id: 102, name: "Procesar Nómina", category: "payroll" },
    { id: 103, name: "Aprobar Nómina", category: "payroll" },
    { id: 104, name: "Generar Recibos", category: "payroll" },
    { id: 105, name: "Configurar Deducciones", category: "payroll" },
    { id: 106, name: "Gestionar Vacaciones", category: "payroll" },
    { id: 107, name: "Reportes de Nómina", category: "payroll" },
  ];

  // Datos quemados de ejemplo - PERMISOS FINANCE
  const financeRoles = [
    { id: 201, name: "Ver Estados Financieros", category: "finance" },
    { id: 202, name: "Crear Presupuestos", category: "finance" },
    { id: 203, name: "Aprobar Gastos", category: "finance" },
    { id: 204, name: "Gestionar Cuentas", category: "finance" },
    { id: 205, name: "Conciliación Bancaria", category: "finance" },
    { id: 206, name: "Reportes Financieros", category: "finance" },
    { id: 207, name: "Auditoría", category: "finance" },
  ];

  const userSelected = { id: 1, nombre: "Juan Pérez" };

  // Estado para los permisos del usuario (algunos ya seleccionados como ejemplo)
  const [userRoles, setUserRoles] = useState([
    { roleId: 1, employeeId: 1 }, // Lectura ya seleccionado
    { roleId: 2, employeeId: 1 }, // Editar ya seleccionado
  ]);

  // Estado para permisos por categoría
  const [categoryRoles, setCategoryRoles] = useState([
    { roleId: 101, employeeId: 1 }, // Ver Nómina
    { roleId: 201, employeeId: 1 }, // Ver Estados Financieros
  ]);

  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const [isPending, setIsPending] = useState(false);

  // Función para obtener los roles según la categoría seleccionada
  const getRolesByCategory = () => {
    switch (selectedCategory) {
      case "payroll":
        return payrollRoles;
      case "finance":
        return financeRoles;
      case "todos":
        return [...payrollRoles, ...financeRoles];
      default:
        return [];
    }
  };

  const handleRoleChange = (roleId, isChecked) => {
    if (isChecked) {
      // Agregar rol
      setUserRoles((prev) => [
        ...prev,
        { roleId, employeeId: userSelected.id },
      ]);
    } else {
      // Quitar rol
      setUserRoles((prev) =>
        prev.filter(
          (userRole) =>
            !(
              userRole.roleId === roleId &&
              userRole.employeeId === userSelected.id
            )
        )
      );
    }
  };

  const handleCategoryRoleChange = (roleId, isChecked) => {
    if (isChecked) {
      // Agregar rol de categoría
      setCategoryRoles((prev) => [
        ...prev,
        { roleId, employeeId: userSelected.id },
      ]);
    } else {
      // Quitar rol de categoría
      setCategoryRoles((prev) =>
        prev.filter(
          (userRole) =>
            !(
              userRole.roleId === roleId &&
              userRole.employeeId === userSelected.id
            )
        )
      );
    }
  };

  const saveUserRoles = async () => {
    setIsPending(true);
    // Simular llamada a API
    setTimeout(() => {
      setIsPending(false);
      const generalPermissions = userRoles
        .map((ur) => generalRoles.find((r) => r.id === ur.roleId)?.name)
        .filter(Boolean);
      const categoryPermissions = categoryRoles
        .map((ur) => {
          const role = [...payrollRoles, ...financeRoles].find(
            (r) => r.id === ur.roleId
          );
          return role ? `${role.name} (${role.category})` : null;
        })
        .filter(Boolean);

      const allPermissions = [...generalPermissions, ...categoryPermissions];
      alert(
        `Permisos guardados para ${
          userSelected.nombre
        }:\n\nPermisos Generales:\n${generalPermissions.join(
          "\n"
        )}\n\nPermisos por Categoría:\n${categoryPermissions.join("\n")}`
      );
    }, 1500);
  };

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Permisos asignados a{" "}
        <span className="font-extrabold text-blue-600">
          {userSelected?.nombre}
        </span>
      </h1>

      {/* SECCIÓN 1: PERMISOS GENERALES */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Permisos Generales
        </h2>
        <div className="flex flex-col gap-4">
          {generalRoles && generalRoles.length > 0 ? (
            generalRoles.map((role) => (
              <div key={role.id} className="inline-flex items-center">
                <label
                  htmlFor={`general-role-${role.id}`}
                  className="flex items-center cursor-pointer relative group"
                >
                  <input
                    type="checkbox"
                    id={`general-role-${role.id}`}
                    className="
                      peer h-5 w-5                       
                      cursor-pointer transition-all    
                      appearance-none                 
                      rounded                          
                      border border-gray-300           
                      checked:bg-blue-500             
                      checked:border-blue-500           
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50  
                      group-hover:shadow-md             
                    "
                    checked={userRoles?.some(
                      (userRole) =>
                        userRole.roleId === role.id &&
                        userRole.employeeId === userSelected?.id
                    )}
                    onChange={(e) =>
                      handleRoleChange(role.id, e.target.checked)
                    }
                  />
                  <span
                    className="
                    absolute text-white opacity-0       
                    peer-checked:opacity-100            
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    pointer-events-none                 
                    transition-opacity duration-200     
                  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  htmlFor={`general-role-${role.id}`}
                  className="cursor-pointer ml-3 text-gray-700 text-lg"
                >
                  {role.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No hay permisos generales disponibles.
            </p>
          )}
        </div>
      </div>

      {/* SECCIÓN 2: PERMISOS POR CATEGORÍA */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Permisos por Categoría
        </h2>

        {/* Select para elegir categoría */}
        <div className="mb-6">
          <label
            htmlFor="category-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccionar Categoría:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="todos">Todos</option>
            <option value="payroll">Payroll</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        {/* Lista de permisos según categoría seleccionada */}
        <div className="flex flex-col gap-4">
          {getRolesByCategory().map((role) => (
            <div key={role.id} className="inline-flex items-center">
              <label
                htmlFor={`category-role-${role.id}`}
                className="flex items-center cursor-pointer relative group"
              >
                <input
                  type="checkbox"
                  id={`category-role-${role.id}`}
                  className="
                    peer h-5 w-5                       
                    cursor-pointer transition-all    
                    appearance-none                 
                    rounded                          
                    border border-gray-300           
                    checked:bg-green-500             
                    checked:border-green-500           
                    focus:outline-none focus:ring-2 focus:ring-green-500/50  
                    group-hover:shadow-md             
                  "
                  checked={categoryRoles?.some(
                    (userRole) =>
                      userRole.roleId === role.id &&
                      userRole.employeeId === userSelected?.id
                  )}
                  onChange={(e) =>
                    handleCategoryRoleChange(role.id, e.target.checked)
                  }
                />
                <span
                  className="
                  absolute text-white opacity-0       
                  peer-checked:opacity-100            
                  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  pointer-events-none                 
                  transition-opacity duration-200     
                "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                htmlFor={`category-role-${role.id}`}
                className="cursor-pointer ml-3 text-gray-700 text-lg"
              >
                {role.name}
                <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {role.category}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Container for the submit button, centered and with good vertical spacing */}
      <div className="flex justify-center mt-8">
        <div>
          <TextButton
            // Primary action button style consistent with iOS/Mac
            bgColor="bg-blue-500"
            hoverBgColor="hover:bg-blue-600"
            textColor="text-white"
            hoverTextColor="hover:text-white" // Text color remains white on hover
            textSize="text-lg" // Consistent text size
            otherProperties="w-full py-3 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out active:scale-[0.98] rounded-xl px-8" // Full width within container, more padding, added shadow, rounded for primary action
            text={isPending ? "Guardando..." : "Guardar Cambios"} // Clearer text for pending state
            onClick={saveUserRoles}
            disabled={isPending} // Disable button while API call is pending
          />
        </div>
      </div>
    </div>
  );
}
