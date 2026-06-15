import { create } from "zustand";
import {
  deleteSessionById,
  getAllSessions,
  updateSessionById,
} from "../api/session";
import { toast } from "react-toastify";

export const useSessionStore = create((set, get) => ({
  sessions: [],
  currentSession: {},
  setCurrentSession: (session) => set({ currentSession: session }),
  clearCurrentSession: () => set({ currentSession: null }),

  updateSession: async (id, updatedData) => {
    await updateSessionById(id, updatedData);
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? { ...session, ...updatedData } : session,
      ),
      currentSession: null,
    }));
  },

  fetchAllSessions: async (filters) => {
      const data = await getAllSessions(filters);
      set({ sessions: data.responses.result });
      set({ currentSession: null });
      return data;
  },
  deleteSession: async (id) => {
    await deleteSessionById(id);
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
      currentSession: null,
    }));
  },
}));
