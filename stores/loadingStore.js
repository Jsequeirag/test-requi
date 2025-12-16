import { create } from "zustand";

const loadingStore = create((set, get) => ({
  loading: false,
  message: "",
  isCountryModalOpen: false,
  initialCheckDone: false,

  setLoading: (loading) => set({ loading }),
  setMessage: (message) => set({ message }),

  // Controlar apertura del modal
  setCountryModalOpen: (open) => set({ isCountryModalOpen: open }),

  // Marcar cuando ya se validó localStorage (para no repetir el chequeo)
  setInitialCheckDone: (done) => set({ initialCheckDone: done }),
}));

export default loadingStore;
