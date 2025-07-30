import { create } from "zustand";
const registerState = create((set) => ({
  registerValues: {},
  setRegisterValues: (value) => {
    set(() => ({
      registerValues: value,
    }));
  },
}));
export default registerState;
