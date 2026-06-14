import { create } from "zustand";
import { deleteOrderById, getAllOrders, updateOrderById } from "../api/order.js";

export const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: {},
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCurrentOrder: () => set({ currentOrder: null }),

  fetchAllOrders: async (filters) => {
    const data = await getAllOrders(filters);
    set({ orders: data.responses });
  },

  updateOrder: async (id, updatedData) => {
    await updateOrderById(id, updatedData);
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...updatedData } : order,
      ),
      currentOrder: null,
    }));
  },

  deleteOrder: async (id) => {
      await deleteOrderById(id);
      set((state) => (
        {
        orders: state.orders.filter((o) => o.id !== id),
        currentSession: null
      }
    ));
    },
}));
