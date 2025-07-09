import React, { useEffect, useState } from "react";
import SelectRole from "../../pages/RolesAdministration/SelectRole";
import { useApiGet, useApiSend } from "../../api/config/customHooks";
import { getRoles, deleteRoleById } from "../../api/urls/roles";
import { getDepartments } from "../../api/urls/department";
import DataTable from "react-data-table-component";
import { IconButton } from "../../components/Button/Button";
import RolesAdministrationStore from "../../../stores/RolesAdministrationStore";
import {
  faPencil,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import GeneralModal from "../../components/modal/GeneralModal";
export default function Roles() {
  //global
  const roles = RolesAdministrationStore((state) => state.roles);
  const setRoles = RolesAdministrationStore((state) => state.setRoles);
  const setRoleSelected = RolesAdministrationStore(
    (state) => state.setRoleSelected
  );
  //modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: <SelectRole action={"Edit"} />,
  });
  //get roles
  var {
    data: rolesData,
    isPending: roleIsPending,
    isSuccess: roleIsSuccess,
  } = useApiGet(["getRoles"], getRoles, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { mutateAsync } = useApiSend(deleteRoleById);

  const deleteRole = async (id) => {
    mutateAsync(id)
      .then(async (res) => {
        setRoles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getRoles
  useEffect(() => {
    if (roleIsSuccess) {
      setRoles(rolesData);
    }
  }, [roleIsSuccess, rolesData]);

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

    {
      name: "Editar",
      center: true,
      cell: (role) => (
        <IconButton
          bgColor={`bg-blue-500`}
          hoverBgColor={`hover:bg-blue-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties="w-auto my-1"
          icon={faPencil}
          onClick={(e) => {
            setRoleSelected(role);
            setModalState({
              isOpen: true,
              content: (
                <SelectRole
                  setEmployeeModal={(val) =>
                    setModalState({ isOpen: val, content: null })
                  }
                />
              ),
            });
          }}
        />
      ),
    },
    {
      name: "Eliminar",
      center: true,
      cell: (role) => (
        <IconButton
          bgColor={`bg-red-500`}
          hoverBgColor={`hover:bg-red-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties="w-auto my-1"
          icon={faTrashCan}
          onClick={(e) => deleteRole(role.id)}
        />
      ),
    },
  ];
  return (
    <div className=" rounded-lg p-6 w-[100%]">
      <GeneralModal
        openModal={modalState.isOpen}
        setOpenModal={(val) => setModalState({ isOpen: val, content: null })}
        childrenComponent={modalState.content}
        movilWidthPorcentage="40%"
        pcWidthPorcentage="40%"
      />

      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Roles</h2>

        <IconButton
          text={"Agregar Rol"}
          bgColor={`bg-blue-500`}
          hoverBgColor={`hover:bg-blue-500`}
          hoverTextColor={`hover:text-black`}
          otherProperties={"max-w-[300px]"}
          icon={faPlus}
        />
      </div>
      <div className="overflow-x-auto p-2">
        {" "}
        <div className="shadow-md rounded-md">
          <DataTable
            columns={roleColumns}
            data={roles}
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            striped
            progressPending={roleIsPending && roleIsPending}
            progressComponent={<p>Cargando...</p>}
          />
        </div>
      </div>
    </div>
  );
}
