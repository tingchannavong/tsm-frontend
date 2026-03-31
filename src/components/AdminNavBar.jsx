import { AdminIcon, ChairIcon, MoneyIcon, ProfileIcon, TimerIcon } from "../icons/index.jsx";
import { useT } from "../languages/translations.js";

function AdminNavBar() {
  const t = useT();
  const navBoxStyles = "flex flex-col items-center";
  
  return (
    <div className="bg-[#60D2CC] w-screen h-25 flex justify-between items-center gap-3 px-4 py-3">
       <div className={navBoxStyles}>
        <MoneyIcon className="h-15 w-15" />
        <p>{t("pricings")}</p>
      </div>
      <div className={navBoxStyles}>
        <ChairIcon className="h-15 w-15" />
        <p>{t("tables")}</p>
      </div>
      <div className={navBoxStyles}>
        <TimerIcon className="h-16 w-16" />
        <p>{t("sessions")}</p>
      </div>
       <div className={navBoxStyles}>
        <AdminIcon className="h-15 w-15" />
        <p>{t("users")}</p>
      </div>
      <div className={navBoxStyles}>
        <ProfileIcon className="h-14 w-14" />
        <p>{t("profile")}</p>
      </div>
    </div>
  );
}

export default AdminNavBar;
