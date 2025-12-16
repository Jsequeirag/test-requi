import { create } from "zustand";
const PendingRequisitionStore = create((set, get) => ({
  requisitions: [],
  setRequisitions: (requisitions) => set({ requisitions: requisitions }),
}));

export default PendingRequisitionStore;
