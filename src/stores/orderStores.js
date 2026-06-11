import { create } from "zustand";
import { getAllOrders } from "../api/order.js";

export const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: {},
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCurrentOrder: () => set({ currentOrder: null }),

  fetchAllOrders: async () => {
    const data = await getAllOrders();
    set({ orders: data.responses });
  },

// To unpaid
//   updateOrder: async (id, updatedData) => {
//     await updateSessionById(id, updatedData);
//     await get().fetchAllSessions();
//     set({ currentSession: null }); 
//   },

// deleteOrder: async (id) => {
//     await deleteSessionById(id);
//     set((state) => ({
//       sessions: state.sessions.filter((s) => s.id !== id),
//     }));
//     set({ currentSession: null });
//   },

}));