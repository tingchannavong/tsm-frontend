import { useT } from "../languages/translations.js";
import styles from "../styles/Base.module.css";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

function NewSessionForm() {
    const t = useT();

  return (
    <div>
      <h1 className={`${styles.subtitle}`}>{t("create_session")}</h1>
    <Input legend="Player Numbers" placeholder="0"/>
    <Input legend="Names" placeholder="Ikko"/>
    <Button text={t("start_timer")} color="bg-black"/>
    </div>
  )
}

export default NewSessionForm