import { useT } from "../languages/translations.js";
import { Outlet } from "react-router";
import styles from "../styles/Base.module.css";

function SessionLayout() {
  const t = useT();

  return (
    <div className={`${styles.mainContainer}`}>
      <h1 className={`${styles.title}`}>{t("sessions")} {t("location")}: Table 1</h1>
      {/* <h2 className="mb-5"></h2> */}
      <Outlet />
    </div>
  );
}

export default SessionLayout;
