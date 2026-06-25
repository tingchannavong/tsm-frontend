import { convertToDateString } from "../../utils/time.js";
import { useAuthStore } from "../../stores/authStores.js";
import { toast } from "react-toastify";
import { useOrderStore } from "../../stores/orderStores.js";

function EditOrderModal() {
    const currentOrder = useOrderStore((state) => state.currentOrder);
    const updateOrder = useOrderStore((state) => state.updateOrder);
    const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder); 
    const user = useAuthStore((state) => state.user);

    const handleClose = () => {
        clearCurrentOrder(); 
        document.getElementById('edit_order_modal').close();
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);
    await updateOrder(currentOrder.id, {...updatedData, updatedById: user.id});
    toast.success("update success.");
    handleClose();
  };

  if (!currentOrder) return null;

  const formLineStyles = "form-control flex gap-2 justify-between" ;

  return (
    <dialog id="edit_order_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Order</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className={formLineStyles}>
            <label className="label">Status</label>
            <select name="status" className="select select-bordered" defaultValue={currentOrder.status}>
              <option value="PAID">Paid</option>
              <option value="UNPAD">Unpaid</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        {/* isAdmin can update more */}

          <div className="modal-action">
            <button type="button" className="btn" onClick={() => handleClose()}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditOrderModal