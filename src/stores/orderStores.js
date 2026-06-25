import { create } from "zustand";
import { deleteOrderById, getAllOrders, getOrderById, updateOrderById } from "../api/order.js";

export const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: {},
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCurrentOrder: () => set({ currentOrder: null }),

  fetchOrderById: async (orderId) => {
    const data = await getOrderById(orderId);
    console.log('data at zustand', data)
    set({ currentOrder: data.responses });
    return data;
  },

  fetchAllOrders: async (filters) => {
    const data = await getAllOrders(filters);
    // console.log('data at zustand', data)
    set({ orders: data.responses.result });
    return data;
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
