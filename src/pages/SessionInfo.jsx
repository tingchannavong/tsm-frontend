import Button from "../components/Button";
import { useT } from "../languages/translations.js";

function SessionInfo() {
      const t = useT();
    
  return (
    <>
        <h2 className="mb-5">{t("location")}: Table 1</h2>
        <div className="flex flex-col gap-5">
        <Button text={t("join_group")}/>
        <Button text={t("view_session")}/>
        <Button text={t("create_session")}/>
        <Button text={t("boardgame_collection")} color="bg-[#7A3CEA]"/>
        </div>
    </>
  );
}

export default SessionInfo;
