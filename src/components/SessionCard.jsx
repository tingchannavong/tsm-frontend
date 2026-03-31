import styles from "../styles/LoginPage.module.css";
import { useT } from "../languages/translations";

function SessionCard({names, people, date, startTime}) {
  const t = useT();

  const subtitleStyles = "text-lg font-bold";
  const infoStyles = "text-md font-normal";
  return (
    <>
      <div className="p-10 flex grow flex-col gap-4 items-start justify-center min-h-full rounded-2xl shadow-xl ">
        <div className="flex gap-5">
          <h1 className={subtitleStyles}>{t("names")}:</h1>
          <div>
            <p>1. Baby</p>
            <p>2. Bob</p>
          </div>
        </div>
        <h1 className={subtitleStyles}>
          {t("guest_number")}: <span className={infoStyles}>3 {t("people")}</span>
        </h1>
         <h1 className={subtitleStyles}>{t("date")}: <span className={infoStyles}>26/03/26</span></h1>
        <h1 className={subtitleStyles}>
          {t("start_time")}: <span className={infoStyles}>16:45</span>
        </h1>
        <h1 className={subtitleStyles}>
          {t("time_elapsed")}: <span className={infoStyles}> ~1 {t("hour")} 45 {t("minutes")}</span>
        </h1>
        <h1 className={subtitleStyles}>{t("est_price")}: <span className={infoStyles}>~220 THB</span></h1>
      </div>
    </>
  );
}

export default SessionCard;
