import { useEffect, useState } from "react";
import { useT } from "../languages/translations";
import {
  convertDateTimeToDate,
  convertToDateString,
  getElapsedTime,
  convertMinToHour
} from "../utils/time.js";
import Button from "../components/Button.jsx";
import { toast } from "react-toastify";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import OrderLineItemCard from "../components/OrderLineItemCard.jsx";
import SmallButton from "../components/SmallButton.jsx";
import { useLocation, useNavigate } from "react-router";
import { createOrder, getOrderPreviewBySessionIds } from "../api/order.js";
import { useAuthStore } from "../stores/authStores.js";
import { getHomePath } from "../utils/auth.js";

function OrderSummary() {
  const t = useT();
  const navigate = useNavigate();
  const [orderPreview, setOrderPreview] = useState(null);
  const [discount, setDiscount] = useState(0);
  const user = useAuthStore((state) => state.user);
  const savedIds = sessionStorage.getItem("sessionIds");

  const hdlGoBack = () => navigate(-1);
  const hdlSubmitOrder = async (e) => {
    e.preventDefault();
    console.log('user', user.id);
    console.log('discount', discount);
    console.log('savedIds', savedIds);
      try {
            // send to backend
        const resp = await createOrder({
          sessionIds: JSON.parse(savedIds),
          createdById: user.id,
          discount: discount
        });
        console.log(resp);
        toast.success('Order created successfully')
        // go to table page
        // navigate(getHomePath());

      } catch (error) {
        console.error(error.message || 'Failed to created order');
      }

  };

  useEffect(() => {

    var sessionIds;
    if (savedIds) {
      sessionIds = JSON.parse(savedIds);
      // console.log("parse ids", sessionIds);
    }

    const fetchPricePreview = async (sessionIds) => {
      try {
        const data = await getOrderPreviewBySessionIds({
          sessionIds: sessionIds,
        });
        // console.log(data.responses);
        setOrderPreview(data.responses);
      } catch (error) {
        toast.error(error.message || "Fetch preview failed");
      }
    };
    fetchPricePreview(sessionIds);
  }, []);

  return (
    <>
      <FeatureHeader title={`${t("order_summary")}`} />
      <div className={styles.mainContainer}>
        <div className="flex flex-col gap-1">
          <SmallButton text={t("go_back")} onClick={hdlGoBack} />
          <div className="bill-header">
            {/* <p>Bill Number: ....</p> */}
            <p>Date: {convertDateTimeToDate(new Date())}</p>
            <p>Hourly Price: {orderPreview?.items[0].basePrice * 60} {orderPreview?.items[0].currencyCode}</p>
          </div>
          {orderPreview?.items && Array.isArray(orderPreview.items) ?
          orderPreview.items.map( (line, i) =>  
          { 
            return <OrderLineItemCard key={line.displayName} index={i} displayName={line.displayName}
          quantity={line.quantity}
          unitPrice={line.unitPrice}
          subTotal={line.subTotal}
          currency={line.currencyCode}
          durationHours={convertMinToHour(line.durationMin)}
          />}
        ) :
          ( <p>Loading summary...</p>)
          }
          <div className="flex flex-col items-end p-4 gap-4">
            <div className="flex gap-2 items-center">
               <label>Discount:</label>
            <input type="text" className="input w-25" placeholder="Enter discount..." name="discount" value={discount} onChange={(e) => {setDiscount(e.target.value)}}/>
            </div>
            <p>Total: {orderPreview?.netTotal} {orderPreview?.items[0].currencyCode}</p>
          </div>
          <Button
            text={t("submit")}
            color="bg-black"
            onClick={hdlSubmitOrder}
          />
          <pre>{JSON.stringify(orderPreview, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
