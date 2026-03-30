import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import { useT } from "../languages/translations.js";
import { useEffect, useState } from "react";
import { getSessionsByLocation } from "../api/session.js";
import { filterGroups } from "../utils/grouping.js";
import { convertDateTimeTo24HrTime } from "../utils/time.js";

function SessionInfo(props) {
  const t = useT();
  const navigate = useNavigate();
  const [groups, setGroups] = useState(null);
  const { id } = useParams();

  const hdlGoToCreate = () => navigate("create");
  const hdlGoToView = () => navigate("view");
  const hdlGoToJoin = () => navigate("join");

  useEffect(() => {
    const fetchGroupSessions = async () => {
      try {
        const data = await getSessionsByLocation(id);
        console.log(data.responses);
  
        const grouped = filterGroups(data.responses);

        // console.log(grouped[0].items.length);
        console.log(typeof grouped);
        console.log(grouped);
        setGroups(grouped);
      } catch (error) {
        console.error("Failed to fetch group sessions:", error);
      }
    };
    fetchGroupSessions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <Button
          text={t("join_group")}
          onClick={() =>
            document.getElementById("choose_group_modal").showModal()
          }
        />
        <Button text={t("view_session")} onClick={hdlGoToView} />
        <Button text={t("create_session")} onClick={hdlGoToCreate} />
        <Button text={t("boardgame_collection")} color="bg-[#7A3CEA]" />
      </div>
      <dialog id="choose_group_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{t("which_group")}</h3>
          <div className="flex flex-col">
          {groups && groups.map( each => (
              <label key={each.groupId}>
              <input type="checkbox" /> {`${each.items.length} ${t("people")} ${t("started")}: ~ ${convertDateTimeTo24HrTime(each.items[0].startTime)}`}
              </label>
            ))}
            </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default SessionInfo;
