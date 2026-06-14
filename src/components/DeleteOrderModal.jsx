import { toast } from "react-toastify";
import { useOrderStore } from "../stores/orderStores.js";
import { convertDateTimeTo24HrTime, convertDateTimeToDate } from "../utils/time";

function DeleteOrderModal() {
    const currentOrder = useOrderStore((state) => state.currentOrder);
    const deleteOrder = useOrderStore((state) => state.deleteOrder);

    const hdlDelete = async () => {
      try {
        await deleteOrder(currentOrder.id)
        toast.success('Deleted successfully')
      } catch (error) {
        toast.error(error.message || 'Cannot delete')
      }
    }

  if (!currentOrder) return null;

  return (
    <dialog id="delete_order_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error">Confirm Deletion</h3>
        <div className="py-4 space-y-2">
          <p><strong>Order ID:</strong> {currentOrder.id}</p>
          <p><strong>Date:</strong> {convertDateTimeToDate(currentOrder.createdAt)}</p>
          <p><strong>Net Total:</strong> {Number(currentOrder?.netTotal)?.toLocaleString()} {currentOrder.orderDetails[0].currencyCode}</p>
          <p><strong>Status:</strong> {currentOrder.status}</p>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={()=>document.getElementById('delete_order_modal').close()}>Cancel</button>
            <button 
              className="btn btn-error ml-2" 
              onClick={hdlDelete}
            >
              Delete Permanently
            </button>
          </form>
        </div>
      </div>
      {/* <pre>{JSON.stringify(currentOrder, null, 2)}</pre> */}
    </dialog>
  );
};

export default DeleteOrderModal;