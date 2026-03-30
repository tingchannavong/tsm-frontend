import { useLangStore } from "../stores/langStore";
import en from "./en.json";
import th from "./th.json";
import la from "./la.json";

const translations = { en, th, la };

export function useT() {
  const lang = useLangStore((s) => s.lang);

   function t(key) {
    const langFile = translations[lang];
    const value = langFile[key];
    // if (!value) {
    //   console.log(`Missing translation: ${key}`);
    //   return key;
    // }
    return value || key;
  }
  return t;
}

