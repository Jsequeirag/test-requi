// Importaciones necesarias de hooks, componentes y funciones externas
import { useState, useEffect } from "react";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import { useApiGet } from "../../api/config/customHooks";
import { getRoles } from "../../api/urls/roles";
import { getEmployees } from "../../api/urls/Employee";
import DataTable from "react-data-table-component";
import { IconButton } from "../../components/Button/Button";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import GeneralModal from "../../components/modal/GeneralModal";
import SelectRoleEmployee from "../../pages/RolesAdministration/SelectRoleEmployee";
import SelectPermissionEmployee from "../../pages/RolesAdministration/SelectPermissionEmployee";
import {
  faPersonCirclePlus,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { getRolesByEmployeeId } from "../../api/urls/userRole";
import TextButton from "../../components/Button/TextButton";
import {
  UserTableSkeleton,
  HeaderTableSearch,
} from "../../components/Skeleton/TableSkn";
export default function RoleEmployee() {
  const setUserSelected = RolesAdministrationStore(
    (state) => state.setEmployeeSelected
  );
  const setUserRoles = RolesAdministrationStore((state) => state.setUserRoles);
  const setRoles = RolesAdministrationStore((state) => state.setRoles);
  // Estado para el modal general
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: <SelectRoleEmployee />,
  });
  const [modalStatePermission, setModalStatePermission] = useState({
    isOpen: false,
    content: <SelectPermissionEmployee />,
  });
  // Estado local para mostrar el loading
  const [loading, setLoading] = useState(false);
  // Función para obtener roles del empleado y abrir el modal
  const getUserRoles = (employeeId) => {
    setLoading(true);
    getRolesByEmployeeId(employeeId)
      .then((res) => {
        setLoading(true); // ← Este `setLoading(true)` parece innecesario aquí
        setUserRoles(res);
        setModalState({
          isOpen: true,
          content: (
            <SelectRoleEmployee
              setEmployeeModal={(val) =>
                setModalState({ isOpen: val, content: null })
              }
            />
          ),
        });
        setLoading(false);
      })
      .catch((e) => {
        setUserRoles([]);
        setLoading(false);
      });
  };

  //get roles
  var {
    data: rolesData,
    isPending: roleIsPending,
    isSuccess: roleIsSuccess,
  } = useApiGet(["getRoles"], getRoles, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //Fetch de empleados
  var {
    data: employees,
    isSuccess,
    isPending,
  } = useApiGet(["getEmployeess"], getEmployees, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  //Definición de columnas para la tabla de empleados
  const employeeColumns = [
    {
      name: "ID empleado",
      selector: (employee) => employee.id,
    },
    {
      name: "Nombre",
      selector: (employee) => employee.nombre,
    },

    {
      name: "Asignar/designar rol",
      center: true,
      cell: (employee) => (
        <IconButton
          bgColor={`bg-blue-500`}
          hoverBgColor={`hover:bg-blue-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties="w-auto my-1"
          icon={faPersonCirclePlus}
          onClick={(e) => {
            setUserSelected(employee);
            getUserRoles(employee.id);
          }}
        />
      ),
    },
  ];
  //search
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = employees?.filter(
    (item) =>
      (item.nombre &&
        item.nombre.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(filterText.toLowerCase()))
  );
  useEffect(() => {
    if (roleIsSuccess) {
      setRoles(rolesData);
    }
  }, [roleIsSuccess, rolesData]);
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
    <div className="rounded-lg p-6 w-[100%]">
      {/* Modal general que muestra el contenido dinámico (SelectRoleEmployee) */}
      <GeneralModal
        openModal={modalState.isOpen}
        setOpenModal={(val) => setModalState({ isOpen: val, content: null })}
        childrenComponent={modalState.content}
      />
      <GeneralModal
        openModal={modalStatePermission.isOpen}
        setOpenModal={(val) =>
          setModalStatePermission({ isOpen: val, content: null })
        }
        childrenComponent={modalStatePermission.content}
      />
      {/* Modal de carga mientras se obtienen los datos */}
      <LoadingModal openModal={loading} />
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <div className="overflow-x-auto">
        <div className="flex mb-4">
          {isPending ? (
            <HeaderTableSearch />
          ) : (
            <>
              {/* Manteniendo el padding del contenedor */}
              <input
                className="
                        flex-grow              
                        max-w-md                   
                        py-2.5 px-4               
                        border border-gray-300    
                        rounded-lg             
                        shadow-sm              
                        text-gray-900           
                        placeholder-gray-500    
                        bg-white                 
                        focus:outline-none   
                        focus:ring-2            
                        focus:ring-blue-500/50    
                        mr-3                   
                      "
                type="text"
                placeholder="Buscar por ID o Nombre..." // Placeholder más descriptivo
                aria-label="Buscar empleado"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <TextButton text={"Limpiar"} onClick={handleClear} />
            </>
          )}
        </div>{" "}
      </div>
      {isPending ? (
        <UserTableSkeleton />
      ) : (
        <div className="shadow-md rounded-md">
          <DataTable
            columns={employeeColumns}
            data={filteredItems}
            pagination
            responsive
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
            subHeaderWrap
            striped
          />
        </div>
      )}
    </div>
  );
}
