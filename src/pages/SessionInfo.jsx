import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import { useT } from "../languages/translations.js";
import { useEffect, useState } from "react";
import { getSessionsByLocation } from "../api/session.js";
import { convertDateTimeTo24HrTime, convertDateTimeToDate } from "../utils/time.js";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

function SessionInfo() {
  const t = useT();
  const navigate = useNavigate();
  const [groups, setGroups] = useState(null);
  const { id } = useParams();
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  const hdlGoToCreate = () => navigate("create");
  const hdlGoToSite = () =>
    window.open("https://alphawolf.ckgroup-laos.com/boardgames/1");

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!selectedGroupId) return toast.error(t("select_group"));

    if (modalAction === "join") {
      navigate("create", { state: { groupId: selectedGroupId } });
    } else if (modalAction === "view") {
      navigate(`view`, { state: { groupId: selectedGroupId} }); 
      // Send only filtered group way // navigate(`view`, { state: { selectedGroup: groups.filter((each) => each.groupId === selectedGroupId),},});
    }

    document.getElementById("choose_group_modal")?.close();
  };

  useEffect(() => {
    const fetchGroupSessions = async () => {
      try {
        const data = await getSessionsByLocation(id);
        setGroups(data.grouped);
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
          onClick={() => {
            if (groups.length === 0)
              return Swal.fire({ title: t("no_session") });
            setModalAction("join");
            document.getElementById("choose_group_modal").showModal();
          }}
        />
        <Button
          text={t("view_session")}
          onClick={() => {
            if (groups.length === 0)
              return Swal.fire({ title: t("no_session") });
            setModalAction("view");
            document.getElementById("choose_group_modal").showModal();
          }}
        />
        <Button text={t("create_session")} onClick={hdlGoToCreate} />
        <Button
          text={t("boardgame_collection")}
          color="bg-[#7A3CEA]"
          onClick={hdlGoToSite}
        />
      </div>
      <dialog id="choose_group_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{t("which_group")}</h3>
          <div className="flex flex-col">
            {groups &&
              groups.map((each) => (
                <label key={each.groupId}>
                  <input
                    type="radio"
                    value={each.groupId}
                    checked={selectedGroupId === each.groupId}
                    onChange={() => setSelectedGroupId(each.groupId)}
                  />{" "}
                  {`${each.items.length} ${t("people")} ${t("started")}: ~ ${convertDateTimeTo24HrTime(each.items[0].startTime)} (${convertDateTimeToDate(each.items[0].startTime)})`}
                </label>
              ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-1">Close</button>
              <button
                className="btn"
                type="submit"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <ToastContainer position="top-center" style={{ zIndex: 9999 }} />
      </dialog>
    </>
  );
}

export default SessionInfo;
