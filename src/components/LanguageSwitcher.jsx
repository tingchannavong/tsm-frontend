import { useLangStore } from "../stores/langStore.js";
import { useT } from "../languages/translations.js";

function LanguageSwitcher() {
    const t = useT();
  const setLang = useLangStore((s) => s.setLang);

  return (
    <>
       <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          {t("lang")}
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li onClick={() => setLang("en")}>
            <a>{t("en")}</a>
          </li>
          <li onClick={() => setLang("th")}>
            <a>{t("th")}</a>
          </li>
          <li onClick={() => setLang("la")}>
            <a>{t("lao")}</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LanguageSwitcher