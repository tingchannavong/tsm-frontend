import { useEffect, useState } from "react";
import { useT } from "../languages/translations";
import {
  convertDateTimeToDate,
  convertToDateString,
  getElapsedTime,
} from "../utils/time.js";
import Button from "../components/Button.jsx";
import { toast } from "react-toastify";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import OrderLineItemCard from "../components/OrderLineItemCard.jsx";
import SmallButton from "../components/SmallButton.jsx";
import { useLocation, useNavigate } from "react-router";
import { getOrderPreviewBySessionIds } from "../api/order.js";

function OrderSummary() {
  const t = useT();
  const navigate = useNavigate();
  const [orderPreview, setOrderPreview] = useState(null);
  const [discount, setDiscount] = useState(0);

const hdlGoBack = () => navigate(-1);
  const hdlSubmitOrder = () => {};

  useEffect(() => {
    const savedIds = sessionStorage.getItem("sessionIds");

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
        console.log(data.responses)
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
          {orderPreview.items &&
          orderPreview.items.map( (line, i) =>  <OrderLineItemCard key={line.displayName} index={i} displayName={line.displayName}
          quantity={line.quantity}
          unitPrice={line.unitPrice}
          subTotal={line.subTotal}
          currency={line.currencyCode}
          />)
          }
          <div className="flex flex-col items-end p-4">
            <p>Discount: Enter..{orderPreview.discount}..</p>
            <p>Total: {orderPreview.netTotal ? orderPreview.netTotal: "N/A"} {orderPreview.items[0].currencyCode}</p>
          </div>
          {/* <pre>{JSON.stringify(orderPreview, null, 2)}</pre> */}
          <Button
            text={t("submit")}
            color="bg-black"
            onClick={hdlSubmitOrder}
          />
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
