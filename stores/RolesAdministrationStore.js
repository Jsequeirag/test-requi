import { create } from "zustand";
import Roles from "../src/pages/RolesAdministration/Roles";
const RolesAdministrationStore = create((set) => ({
  employeeSelected: {},
  roleSelected: {},
  roles: [],
  userRoles: [],
  employeeModal: false,
  Departments: [],
  setDeparments: (Departments) => {
    set(() => ({
      Departments: Departments,
    }));
  },
  setEmployeeSelected: (employee) => {
    set(() => ({
      employeeSelected: employee,
    }));
  },
  setRoleSelected: (role) => {
    set(() => ({
      roleSelected: role,
    }));
  },
  setRoles: (roles) => {
    set(() => ({
      roles: roles,
    }));
  },
  setUserRoles: (roles) => {
    set(() => ({
      userRoles: roles,
    }));
  },
  setEmployeeModal: (value) => {
    set((state) => ({
      employeeModal: value,
    }));
  },
}));
export default RolesAdministrationStore;
