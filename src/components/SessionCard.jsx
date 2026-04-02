import { useEffect, useState } from "react";
import { useT } from "../languages/translations";
import { toast } from "react-toastify";
import { getOrderPreviewBySessionIds } from "../api/order";
import { convertToDateString } from "../utils/time";
import Button from "./Button";
import Swal from "sweetalert2";
import { havePermission } from "../utils/auth";

function SessionCard({ names, people, date, startTime, timeElapsed, group }) {
  const t = useT();
  const canView = havePermission();

  const [orderPreview, setOrderPreview] = useState();
  const [isEndTimer, setIsEndTimer] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const sessions = group.items;

  const subtitleStyles = "text-lg font-bold";
  const infoStyles = "text-md font-normal";

  const hdlEndTimer = () => {
    setIsEndTimer(true);
    // check which sessionId is ticked
    // compile to sessionIds array
    // send update to backend
    // GO TO ORDER PREVIEW
  };

  const hdlCheckboxChange = (sessionId) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId],
    );
  };

  const hdlSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = sessions.map((s) => s.id);
      setSelectedSessions(allIds);
    } else {
      setSelectedSessions([]);
    }
  };

  const hdlSubmit = () => {
    console.log("slected IDs:", selectedSessions);
    Swal.fire({
      text: "Coming Soon!"
    })
    // API NEED BACKEND FIRST
    setIsEndTimer(false);
    setSelectedSessions([]);
  };

  useEffect(() => {
    // fetch session ids from group
    // console.log('group', group);
    const sessionIds = group.items.map((item) => item.id);
    const previewEndTime = convertToDateString();
    const body = { sessionIds: sessionIds, endTime: previewEndTime };

    const fetchPricePreview = async () => {
      try {
        const data = await getOrderPreviewBySessionIds(body);
        setOrderPreview(data.responses);
        // console.log(orderPreview)
      } catch (error) {
        toast.error(error.message || "Fetch preview failed");
      }
    };
    fetchPricePreview();
  }, []);

  return (
    <>
      <div className="p-4 flex grow flex-col gap-4  min-h-full w-full items-start justify-center rounded-2xl shadow-xl ">
        <h1 className={subtitleStyles}>
          {t("start_time")}: <span className={infoStyles}>{startTime}</span>
        </h1>
        <h1 className={subtitleStyles}>
          {t("time_elapsed")}:{" "}
          <span className={infoStyles}>
            {" "}
            ~{timeElapsed.hours ? `${timeElapsed.hours} ${t("hour")} ` : ""}
            {timeElapsed.minutes
              ? `${timeElapsed.minutes} ${t("minutes")}`
              : ""}
          </span>
        </h1>
        <h1 className={subtitleStyles}>
          {t("date")}: <span className={infoStyles}>{date}</span>
        </h1>
        <h1 className={subtitleStyles}>
          {t("guest_number")}:{" "}
          <span className={infoStyles}>
            {people} {t("people")}
          </span>
        </h1>
        <div className="flex gap-5">
          <h1 className={subtitleStyles}>{t("names")}:</h1>
          <div>
            {sessions &&
              sessions.map((session, i) => (
                <p>
                  {i + 1}. {session.name}{" "}
                  {isEndTimer && (
                    <input
                      type="checkbox"
                      value={session.id}
                      checked={selectedSessions.includes(session.id)}
                      onChange={() => hdlCheckboxChange(session.id)}
                    />
                  )}
                </p>
              ))}
            {isEndTimer && (
              <>
                <label>
                  All Guests I
                  <input
                    type="checkbox"
                    onChange={hdlSelectAll}
                    checked={selectedSessions.length === sessions.length}
                  />
                </label>
              </>
            )}
          </div>
        </div>
        {isEndTimer && (
          <>
          <p>{t("choose_guests")}</p>
                <Button
                  text={t("confirm_end")}
                  color="bg-red-700"
                  onClick={hdlSubmit}
                />
                <Button
                  text={t("cancel")}
                  color="bg-gray-400"
                  onClick={() => setIsEndTimer(false)}
                />
          </>
        )}
        <h1 className={subtitleStyles}>
          {t("est_price")}:{" "}
          <span className={infoStyles}>
            ~{orderPreview?.items[0].subTotal}{" "}
            {orderPreview?.items[0].currencyCode}
          </span>
        </h1>
        {canView && !isEndTimer &&
        <Button
          text={t("end_timer")}
          color="bg-gray-700"
          onClick={hdlEndTimer}
        />
        }
      </div>
    </>
  );
}

export default SessionCard;
