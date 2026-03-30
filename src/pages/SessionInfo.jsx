import { useLocation, useNavigate } from "react-router";
import Button from "../components/Button";
import { useT } from "../languages/translations.js";

function SessionInfo(props) {
  const t = useT();
  const navigate = useNavigate();
  const path = useLocation();

  const hdlGoToCreateSession = () => {
    const urlPath = path.pathname;
    navigate(`${urlPath}/create`);
  };

  const hdlGoToCreate = () => navigate("create");
  const hdlGoToView = () => navigate("view");
  const hdlGoToJoin = () => navigate("join");

  return (
    <>
      <div className="flex flex-col gap-5">
        <Button text={t("join_group")} />
        <Button text={t("view_session")} />
        <Button text={t("create_session")} onClick={hdlGoToCreate} />
        <Button text={t("boardgame_collection")} color="bg-[#7A3CEA]" />
      </div>
    </>
  );
}

export default SessionInfo;
