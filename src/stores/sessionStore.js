import { create } from "zustand";
import { deleteSessionById, getAllSessions } from "../api/session";

export const useSessionStore = create((set, get) => ({
  sessions: [],
  currentSession: null,
  fetchAllSessions: async () => {
    const data = await getAllSessions();
    set({ sessions: data.responses });
  },
  deleteSession: async (id) => {
    await deleteSessionById(id);
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
    }));
  },
}));
