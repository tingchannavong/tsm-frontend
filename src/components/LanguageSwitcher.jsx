import { useLangStore } from "../stores/langStore.js";

function LanguageSwitcher() {
  const setLang = useLangStore((s) => s.setLang);

  return (
    <>
      <button onClick={() => setLang("en")}>EN</button>
      <button onClick={() => setLang("th")}>TH</button>
    </>
  );
}

export default LanguageSwitcher