import { useSessionStore } from "../stores/sessionStore";
import { convertToDateString } from "../utils/time";
import { useAuthStore } from "../stores/authStores.js";
import { toast } from "react-toastify";

function EditModal() {
    const currentSession = useSessionStore(state => state.currentSession)
    const updateSession = useSessionStore(state => state.updateSession)
      const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);
    console.log(user.id)
    // updatedData.updateSessionById = user.id;
    console.log(updatedData)
    
    await updateSession(currentSession.id, updatedData);
    toast.success("update success.")
    document.getElementById('edit_session_modal').close();
  };

  if (!currentSession) return null;

  return (
    <dialog id="edit_session_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Session</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">Name</label>
            <input name="name" className="input input-bordered" defaultValue={currentSession.name} />
          </div>

            <div className="form-control flex-1">
              <label className="label">Start Time</label>
              <input type="datetime-local" name="startTime" className="input input-bordered" defaultValue={convertToDateString(currentSession.startTime)} />
            </div>
            <div className="form-control flex-1">
              <label className="label">End Time</label>
              <input type="datetime-local" name="endTime" className="input input-bordered" defaultValue={currentSession.endTime ? convertToDateString(currentSession.endTime): "N/A"} />
            </div>
       

          <div className="form-control">
            <label className="label">Status</label>
            <select name="status" className="select select-bordered" defaultValue={currentSession.status}>
              <option value="ACTIVE">Active</option>
              <option value="ENDED">Ended</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={() => {document.getElementById('edit_session_modal').close(); }}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditModal