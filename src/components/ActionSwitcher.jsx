import { useState } from "react";
import { useT } from "../languages/translations.js";
import { toast } from "react-toastify";
import { useSessionStore } from "../stores/sessionStore.js";
import Swal from "sweetalert2";

function ActionSwitcher({id, session}) {
    const t = useT();
    const setCurrentSession = useSessionStore(state => state.setCurrentSession)

  // const hdlView = () => {}

const openDeleteModal = () => {
  setCurrentSession(session);
  setTimeout(() => {
    document.getElementById('delete_session_modal')?.showModal();
  }, 10);
  
};

const openEditModal = () => {
  setCurrentSession(session);
  setTimeout(() => {
    document.getElementById('edit_session_modal')?.showModal();
  }, 10);
};

const actionStyles = "text-white bg-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-blue-100"
const listStyles = "border border-base-100"
const labelStyles = "block text-right font-semibold"
  return (
    <>
       <div className="dropdown dropdown-end">
     <div tabIndex={0} role="button" className={`btn m-1 ${actionStyles}`}>
          {t("edit")}
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-blue-200 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {/* <li className={listStyles} onClick={() => hdlView}>
            <a className={labelStyles}>{t("view")}</a>
          </li> */}
          <li className={listStyles} onClick={openEditModal}>
            <a className={labelStyles}>{t("edit")}</a>
          </li>
          <li className={listStyles} onClick={openDeleteModal}> 
            <a className={labelStyles}>{t("delete")}</a>
          </li>
        </ul>
      </div>

    </>
  );
}

export default ActionSwitcher