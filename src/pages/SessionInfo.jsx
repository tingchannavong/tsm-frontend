import styles from "../styles/Base.module.css";
import Button from "../components/Button";
import { useT } from "../languages/translations.js";

function SessionInfo() {
      const t = useT();
    
  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <h1 className={`${styles.title}`}>Session Info</h1>
        <h2 className="mb-5">Location: Table 1</h2>
        <div className="flex flex-col gap-5">
        <Button text={t("join_group")}/>
        <Button text={t("view_session")}/>
        <Button text={t("create_session")}/>
        </div>
        </div>
    </>
  );
}

export default SessionInfo;
