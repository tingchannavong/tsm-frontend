import { useT } from "../languages/translations.js";

function StatusSessionDD({ value, onChange }) {
  const t = useT();

  return (
    <div>
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
  );
}

export default StatusSessionDD;
