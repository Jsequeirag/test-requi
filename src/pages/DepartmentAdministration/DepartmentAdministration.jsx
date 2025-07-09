import { useState, useEffect } from "react";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import React from "react";
import TextButton from "../../components/Button/TextButton";
import Layout from "../../components/Layout/Layout";
import DataTable from "react-data-table-component";
import { IconButton } from "../../components/Button/Button";
import GeneralModal from "../../components/modal/GeneralModal";
import { useApiGet } from "../../api/config/customHooks";
import { getEmployeesBySupervisorRole } from "../../api/urls/Employee";
import { getDepartmentByEmployeeId } from "../../api/urls/userDepartment";
import { getDepartments } from "../../api/urls/department";
import DepartmentAdministrationStore from "../../../stores/DepartmentAdministrationStore";
import AsignDepartment from "./AsignDepartment";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import {
  UserTableSkeleton,
  HeaderTableSearch,
} from "../../components/Skeleton/TableSkn";
import { ChevronLeft } from "lucide-react";

export default function DepartmentAdministration() {
  //global
  const Departments = DepartmentAdministrationStore(
    (state) => state.Departments
  );
  const setUserSelected = DepartmentAdministrationStore(
    (state) => state.setEmployeeSelected
  );
  const setUserDepartments = DepartmentAdministrationStore(
    (state) => state.setUserDepartments
  );
  const departmentModal = DepartmentAdministrationStore(
    (state) => state.departmentModal
  );
  const setDepartmentModal = DepartmentAdministrationStore(
    (state) => state.setDepartmentModal
  );

  // local
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  //fetch
  var { data: employees, isPending: employeesIsPending } = useApiGet(
    ["getEmployeesBySupervisorRole"],
    getEmployeesBySupervisorRole,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  var { data: departments, isPending: departmentsIsPending } = useApiGet(
    ["getDepartments"],
    getDepartments,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  var {
    data: userDepartments,
    isLoading: userDepartmentsIsLoading,
    refetch: userDepartmentsRefetch,
  } = useApiGet(
    selectedId ? ["getDepartmentByEmployeeId", selectedId] : null, // key incluye el ID
    () => getDepartmentByEmployeeId(selectedId), // función pasa el ID
    {
      enabled: !!selectedId, // solo ejecuta si hay ID
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const getUserDepartment = (employeeId) => {
    setSelectedId(employeeId);
    setDepartmentModal(true);
  };
  const fetchUserDepartments = async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getDepartmentByEmployeeId(id);
      setLoading(false);
      setDepartmentModal(true);
      setUserDepartments(data);
    } catch (error) {
      setDepartmentModal(false);
      setLoading(false);
      console.error("Error fetching department:", error);
    }
  };
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
      name: "Descripción Departamento",
      selector: (employee) => employee.descrip_Centro_Costo,
    },
    {
      name: "Descripción Puesto",
      selector: (employee) => employee.descrip_Puesto,
    },
    {
      name: "Asignar/designar departamento",
      center: true,
      cell: (employee) => (
        <IconButton
          bgColor={`bg-blue-500`}
          hoverBgColor={`hover:bg-blue-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties="w-auto my-1"
          icon={faBuildingUser}
          onClick={(e) => {
            setUserSelected(employee);
            fetchUserDepartments(employee.id);
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

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };
  useEffect(() => {
    if (selectedId) {
      userDepartmentsRefetch();
    }
  }, [selectedId]);
  return (
    <Layout>
      <LoadingModal openModal={loading} />
      {
        <GeneralModal
          openModal={departmentModal}
          setOpenModal={setDepartmentModal}
          childrenComponent={
            <AsignDepartment
              setEmployeeModal={setDepartmentModal}
              departments={departments}
              selectedId={selectedId}
              userDepartments={userDepartments}
            />
          }
          movilWidthPorcentage="40%"
          pcWidthPorcentage="40%"
        />
      }
      <div className="m-4">
        <div className="border-b bg-white rounded-sm  h-full">
          <div className="flex items-center p-4 mx-2">
            <a
              href="/ConfigurationDashboard"
              className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
              <TextButton text={"Atrás"} className="p-0 text-lg font-medium" />
            </a>
            <h1 className="px-9 text-3xl p-4">
              Administracion de departamentos
            </h1>
          </div>

          <div className="p-6">
            {" "}
            <div className="rounded-lg p-6 w-[100%]">
              <h2 className="text-xl font-bold mb-4">Usuarios</h2>
              <div className="overflow-x-auto p-1">
                {" "}
                <div className="flex mb-4">
                  {employeesIsPending ? (
                    <HeaderTableSearch />
                  ) : (
                    <>
                      <input
                        className="  flex-grow              
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
        mr-3           "
                        type="text"
                        placeholder="Buscar por Departamento o Descripción..." // Placeholder más descriptivo
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                      />
                      <TextButton
                        className="ml-4"
                        text={"Limpiar"}
                        onClick={handleClear}
                      />
                    </>
                  )}
                </div>
                {employeesIsPending ? (
                  <UserTableSkeleton />
                ) : (
                  <div className="shadow-md rounded-md">
                    <DataTable
                      columns={employeeColumns}
                      data={filteredItems}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      persistTableHead
                      striped
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
