import { useT } from "../languages/translations.js";

function StatusSessionDD({ value, onChange }) {
  const t = useT();
  const buttonStyles = "p-2 text-start hover:bg-base-300 uppercase";

  return (
    <div>
        {/* <summary className="btn m-1">{t("status")}</summary> */}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm border-black">
        <option value="ACTIVE">
          {t("active")}
        </option>
        <option value="ENDED">
          {t("ended")}
        </option>
        <option value="BILLED">
          {t("billed")}
        </option>
        <option value="CANCELLED">
          {t("cancelled")}
        </option>
        <option value="all">
          {t("all")}
        </option>
      </select>
    </div>
    //  <div>
    //   <details className="dropdown z-50">
    //     <summary className="btn m-1">{t("status")}</summary>
    //     <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    //         <button onClick={() => onSelect("ACTIVE")} className={buttonStyles}>{t("active")}</button>
    //         <button onClick={() => onSelect("ENDED")} className={buttonStyles}>{t("ended")}</button>
    //         <button onClick={() => onSelect("BILLED")} className={buttonStyles}>{t("billed")}</button>
    //         <button onClick={() => onSelect("CANCELLED")} className={buttonStyles}>{t("cancelled")}</button>
    //         <button onClick={() => onSelect("all")} className={buttonStyles}>{t("all")}</button>
    //     </div>
    //   </details>
    // </div>
  );
}

export default StatusSessionDD;
