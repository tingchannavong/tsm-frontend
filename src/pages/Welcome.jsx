import styles from "../styles/LoginPage.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useT } from "../languages/translations.js";

function Welcome() {
    const t = useT();
  return (
      <div className={`${styles.container}`}>
        <p className={styles.title}>{t("welcome")}</p>
        <p className="text-lg italic font-bold">{t("scan")}</p>
      </div>
  );
}

export default Welcome;
