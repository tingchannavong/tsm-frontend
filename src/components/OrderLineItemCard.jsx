
function OrderLineItemCard({index, displayName, quantity, unitPrice, subTotal, currency}) {
  return (
    <div>
      <div className="flex flex-col gap-3 border-2 border-base-200 p-2 m-4 rounded-2xl">
        <p>{index+1}. {displayName}</p>
         <p className="ml-3">x {quantity}</p>
        <div className="flex justify-between">
         <p>{unitPrice}</p>
        <p>{subTotal} {currency}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderLineItemCard;
