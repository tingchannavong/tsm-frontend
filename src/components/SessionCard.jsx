import { useEffect, useState } from "react";
import { useT } from "../languages/translations";
import { toast } from "react-toastify";
import { getOrderPreviewBySessionIds } from "../api/order";
import { convertToDateString } from "../utils/time";

function SessionCard({ names, people, date, startTime, timeElapsed, group }) {
  const t = useT();
  const [orderPreview, setOrderPreview] = useState();

  const subtitleStyles = "text-lg font-bold";
  const infoStyles = "text-md font-normal";

  useEffect(() => {
    // fetch session ids from group
    // console.log(group.items);
    const sessionIds = group.items.map( item => item.id)
    const previewEndTime = convertToDateString();
    const body = {sessionIds: sessionIds, endTime: previewEndTime}

    const fetchPricePreview = async () => {
      try {
        const data = await getOrderPreviewBySessionIds(body);
        setOrderPreview(data.responses);
        // console.log(orderPreview)
      } catch (error) {
        toast.error(error.message || 'Fetch preview failed')
      }
    }
    fetchPricePreview()
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
            {timeElapsed.minutes ? `${timeElapsed.minutes} ${t("minutes")}` : ""} 
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
            {names &&
              names.map((name, i) => (
                <p>
                  {i + 1}. {name}
                </p>
              ))}
          </div>
        </div>
        <h1 className={subtitleStyles}>
          {t("est_price")}: <span className={infoStyles}>~{orderPreview?.items[0].subTotal} {orderPreview?.items[0].currencyCode}</span>
        </h1>
      </div>
    </>
  );
}

export default SessionCard;
