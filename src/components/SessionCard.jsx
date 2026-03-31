import styles from "../styles/LoginPage.module.css";
import { useT } from "../languages/translations";

function SessionCard({ names, people, date, startTime, timeElapsed }) {
  const t = useT();

  const subtitleStyles = "text-lg font-bold";
  const infoStyles = "text-md font-normal";
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
            ~{timeElapsed.hours} {t("hour")} {timeElapsed.minutes}{" "}
            {t("minutes")}
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
          {t("est_price")}: <span className={infoStyles}>~220 THB</span>
        </h1>
      </div>
    </>
  );
}

export default SessionCard;
