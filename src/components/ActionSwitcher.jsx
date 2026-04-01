import { useState } from "react";
import { useT } from "../languages/translations.js";
import { convertDateTimeTo24HrTime, convertDateTimeToDate } from "../utils/time.js";
import { deleteSessionById } from "../api/session.js";
import { toast } from "react-toastify";
import { useSessionStore } from "../stores/sessionStore.js";

function ActionSwitcher({id, session}) {
    const t = useT();
     const deleteSession = useSessionStore(state => state.deleteSession)
    
    // const hdlView = () => {}

    const hdlEdit = (id) => {
        // grab id
        console.log(id);
        // fetch data of get session by id
        // dialog box component pop up
    }
    const hdlDelete = async (id) => {
         // e.preventDefault();

         try {
            await deleteSession(id);
            toast.success(t("delete_success"));
         } catch (error) {
            console.log(error)
            toast.error(error.message)
         }

         // document.getElementById("session_delete_modal")?.close();
    }
    // document.getElementById('session_delete_modal').showModal()
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
          <li className={listStyles} onClick={() => hdlEdit(id)}>
            <a className={labelStyles}>{t("edit")}</a>
          </li>
          <li className={listStyles} onClick={()=>hdlDelete(id)}> 
            <a className={labelStyles}>{t("delete")}</a>
          </li>
        </ul>
      </div>

<dialog id="session_delete_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{t("delete_q")}</h3>
    <div className="flex flex-col justify-start">
    <p className="py-1">{`${t("location")}: ${session.location.name}`}</p>
    <p className="py-1">{`${t("start_time")}: ${convertDateTimeTo24HrTime(session.startTime)}`}</p>
     <p className="py-1">{`${t("name")}: ${session.name}`}</p>
    <p className="py-1">{`${t("date")}: ${convertDateTimeToDate(session.startTime)}`}</p>
    </div>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn mr-2">Close</button>
        <button className="btn" type="submit"
        onClick={(e) => hdlDelete(e, id)}>Submit</button>
      </form>
    </div>
  </div>
</dialog>

    </>
  );
}


export default ActionSwitcher