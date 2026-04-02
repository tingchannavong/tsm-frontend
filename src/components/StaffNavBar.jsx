import { Link } from "react-router";
import { ChairIcon, ProfileIcon, TimerIcon } from "../icons";
import { useT } from "../languages/translations.js";


function StaffNavBar() {
  const t = useT();
  const navBoxStyles = "flex flex-col items-center";
  const bigScreenStyles="xl: justify-center gap-15";
  
  return (
    <div className={`bg-[#60D2CC] w-screen h-25 flex justify-between items-center gap-3 px-10 py-3 ${bigScreenStyles}`}>
      <Link to=".">
      <div className={navBoxStyles}>
        <ChairIcon className="h-15 w-15" />
        <p>{t("tables")}</p>
      </div>
      </Link>
      <Link to="sessions">
      <div className={navBoxStyles}>
        <TimerIcon className="h-16 w-16" />
        <p>{t("sessions")}</p>
      </div>
      </Link>
      <Link to="profile">
      <div className={navBoxStyles}>
        <ProfileIcon className="h-14 w-14" />
        <p>{t("profile")}</p>
      </div>
      </Link>
    </div>
  );
}

export default StaffNavBar;
