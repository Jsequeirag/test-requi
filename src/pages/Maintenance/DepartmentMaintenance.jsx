import React, { useEffect, useState } from "react";
import { useApiGet, useApiSend } from "../../api/config/customHooks";
import {
  getDepartments,
  updateInfoDepartments,
} from "../../api/urls/department";
import DataTable from "react-data-table-component";
import { TextButton } from "../../components/Button/Button";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/Layout/Layout";
export default function DepartmentMaintenance() {
  //getDepartment
  var {
    data: departmentsData,
    isPending: departmentsIsPending,
    isSuccess: departmentsIsSuccess,
    refetch,
  } = useApiGet(["getDepartments"], getDepartments, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { isPending, mutateAsync } = useApiSend(updateInfoDepartments);

  const updateInfoDepartmentsFunc = () => mutateAsync().then(refetch());

  //getDepartment
  const roleColumns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      wrap: true,
    },
  ]; //search
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = departmentsData?.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
    <Layout>
      <div className="m-4 w-full">
        <div className="border-b  bg-white rounded-sm w-[86%] p-6 mt-4">
          <div className="flex items-center border-b p-4 mx-2">
            <a href="/ConfigurationDashboard">
              <TextButton text={"Atras"} />
            </a>
            {/*Titulo */}
            <h1 className="px-9 text-3xl p-4">Mantenimiento - Departamentos</h1>
          </div>{" "}
          <div className=" rounded-lg p-6 w-[100%]">
            <h2 className="text-xl font-bold mb-4">Departamentos</h2>
            <div className="overflow-x-auto">
              <div className="flex">
                <input
                  className="shadow  border rounded-sm w-[300px] text-grey-darker text-lg focus:coutline-input py-2 px-3 "
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <TextButton text={"Limpiar"} onClick={handleClear} />
                <TextButton
                  text={"Actualizar Departamentos"}
                  disabled={isPending}
                  onClick={updateInfoDepartmentsFunc}
                  otherProperties="ml-4"
                />
                <div className="ml-6 flex justify-center items-center">
                  {isPending && (
                    <FontAwesomeIcon icon={faSpinner} size="2xl" spinPulse />
                  )}
                </div>
              </div>
              <DataTable
                columns={roleColumns}
                data={filteredItems}
                direction="auto"
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                subHeaderAlign="right"
                subHeaderWrap
                striped
                progressPending={departmentsIsPending}
                progressComponent={<p>Cargando...</p>}
              />
            </div>
          </div>{" "}
        </div>
      </div>
    </Layout>
  );
}
