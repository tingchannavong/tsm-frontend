import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";

function AllSessions() {
  const t = useT();
  return (
    <>
      <FeatureHeader title={`${t("session_management")}`} />
      <div className={styles.mainContainer}>
        Table of All sessions
      </div>
    </>
  );
}

export default AllSessions;
