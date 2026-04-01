import { create } from "zustand";
import { deleteSessionById, getAllSessions, updateSessionById } from "../api/session";

export const useSessionStore = create((set, get) => ({
  sessions: [],
  currentSession: null,
  setCurrentSession: (session) => set({ currentSession: session }),
  clearCurrentSession: () => set({ currentSession: null }),

  updateSession: async (id, updatedData) => {
    await updateSessionById(id, updatedData);
    await get().fetchAllSessions();
    set({ currentSession: null }); 
  },

  fetchAllSessions: async () => {
    const data = await getAllSessions();
    set({ sessions: data.responses });
    set({ currentSession: null });
  },
  deleteSession: async (id) => {
    await deleteSessionById(id);
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
    }));
    set({ currentSession: null });
  },
}));
