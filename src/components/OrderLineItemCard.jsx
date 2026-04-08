import { useT } from "../languages/translations";

function OrderLineItemCard({index, displayName, quantity, unitPrice, subTotal, currency, durationHours}) {
    const t = useT();
  
    return (
    <div>
      <div className="flex flex-col gap-3 border-2 border-[#959B94] bg-base-300 p-2 m-4 rounded-2xl">
        <p>{index+1}. {displayName} ({durationHours} hours)</p>
         <p className="ml-3">x {quantity}</p>
        <div className="flex justify-between">
         <p>Price: {unitPrice} </p>
        <p>{subTotal} {currency}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderLineItemCard;
