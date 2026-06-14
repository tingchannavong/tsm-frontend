import { useState } from "react";
import { useT } from "../languages/translations.js";
import { toast } from "react-toastify";
import { useSessionStore } from "../stores/sessionStore.js";
import Swal from "sweetalert2";

function ActionSwitcher({ actions }) {
  // actions = [{ label, onClick, style? }]
   const t = useT();

  const actionStyles = "text-white bg-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-blue-100";
  const listStyles = "border border-base-100";
  const labelStyles = "block text-right font-semibold";

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className={`btn m-1 ${actionStyles}`}>
        {t("action")}
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-blue-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {actions.map(({ label, onClick }) => (
          <li key={label} className={listStyles} onClick={onClick}>
            <a className={labelStyles}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionSwitcher;