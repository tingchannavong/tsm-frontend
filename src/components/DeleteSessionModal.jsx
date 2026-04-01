import { toast } from "react-toastify";
import { useSessionStore } from "../stores/sessionStore";
import { convertDateTimeTo24HrTime, convertDateTimeToDate } from "../utils/time";

function DeleteModal() {
       const currentSession = useSessionStore(state => state.currentSession)
    const deleteSession = useSessionStore(state => state.deleteSession)

    const hdlDelete = async () => {
      try {
        await deleteSession(currentSession.id)
        toast.success('Deleted successfully')
      } catch (error) {
        toast.error(error.message || 'Cannot delete')
      }
    }

  if (!currentSession) return null;

  return (
    <dialog id="delete_session_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error">Confirm Deletion</h3>
        <div className="py-4 space-y-2">
          <p><strong>Name:</strong> {currentSession.name}</p>
          <p><strong>Date:</strong> {convertDateTimeToDate(currentSession.startTime)}</p>
          <p><strong>Time:</strong> {convertDateTimeTo24HrTime(currentSession.startTime)} - {currentSession.endTime? convertDateTimeTo24HrTime(currentSession.endTime) : "N/A"}</p>
          <p><strong>Status:</strong> {currentSession.status}</p>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>document.getElementById('delete_session_modal').close()}>Cancel</button>
            <button 
              className="btn btn-error ml-2" 
              onClick={hdlDelete}
            >
              Delete Permanently
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal