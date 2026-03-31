import { TimerIcon } from "../icons";
import { useT } from "../languages/translations.js";

function Footer() {
  const textStyles = "text-white font-bold";
  const t = useT();

  return (
    <div className="bg-[#2D877C] w-screen h-30 flex justify-center items-center gap-3">
      <div className="flex flex-col">
        <p className={textStyles}>{t("tsm")}</p>
        <p className={textStyles}>Lao Pioneer © 2026</p>
      </div>
      <TimerIcon className="h-20 w-20" />
    </div>
  );
}

export default Footer;
