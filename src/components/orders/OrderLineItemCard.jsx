import { useT } from "../../languages/translations.js";
import { convertMinToHour } from "../../utils/time.js";

function OrderLineItemCard({index, displayName, quantity, unitPrice, subTotal, currency, durationMin, sessions}) {
    const t = useT();
  
    return (
    <div>
      <div className="flex flex-col gap-3 border-2 border-[#959B94] bg-base-300 p-2 m-4 rounded-2xl">
        <p>{index+1}. {displayName} ({durationMin > 60 ? (convertMinToHour(durationMin) + " hours"): (durationMin + " minutes")}  )</p>
         <p className="ml-3">x {quantity}</p>
         <p className="ml-3">{t("names")}: {sessions?.map((session) => session.name).join(", ")}</p>
        <div className="flex justify-between">
         <p>Price: {unitPrice?.toLocaleString()} </p>
        <p>{subTotal} {currency}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderLineItemCard;
