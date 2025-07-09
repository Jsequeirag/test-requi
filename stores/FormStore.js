import { create } from "zustand";
const formState = create((set) => ({
  employees: [],
  employeeSelected: {},
  formValues: {},
  setFormValues: (value) => {
    set((state) => ({
      formValues: {
        ...state.formValues,
        ...value,
      },
    }));
  },
  setForm: (value) => {
    set(() => ({
      formValues: value,
    }));
  },
  setEmployeeSelected: (value) => {
    set(() => ({
      employeeSelected: value,
    }));
  },
  resetFormValue: (name) => {
    set((state) => {
      delete state.formValues[name];
      return {
        formValues: { ...state.formValues },
      };
    });
  },
  /*  setLatePayload: (id) => {
    set((state) => ({
      clients: state.clients.map((value) => {
        if (value.id === id) {
          value.latePayment = !value.latePayment;
        }
        console.log(value);
        return value;
      }),
    }));
  },*/
}));
export default formState;
