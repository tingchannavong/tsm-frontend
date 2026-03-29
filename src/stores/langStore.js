import { create } from "zustand";

export const useLangStore = create((set, get) => ({
    lang: "en",
    setLang: (newLang) => set({lang: newLang})
}));