import { create } from "zustand";

const DepartmentAdministrationStore = create((set) => ({
  employeeSelected: {},
  userDepartments: [],
  departmentModal: false,
  setUserDepartments: (department) => {
    set(() => ({
      userDepartments: department,
    }));
  },
  setEmployeeSelected: (employee) => {
    set(() => ({
      employeeSelected: employee,
    }));
  },
  setDepartmentModal: (value) => {
    set((state) => ({
      departmentModal: value,
    }));
  },
}));
export default DepartmentAdministrationStore;
