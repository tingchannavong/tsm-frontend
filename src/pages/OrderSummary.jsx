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

function OrderSummary() {
  const t = useT();
  const navigate = useNavigate();

  const hdlGoBack = () => navigate(-1);
  const hdlSubmitOrder = () => {};

  useEffect(() => {
    const savedIds = sessionStorage.getItem("sessionIds");
    if (savedIds) { 
      const sessionIds = JSON.parse(savedIds);
      console.log('parse ids', sessionIds)
    }
    // const sessionIds = selectedGroup.items.map((item) => item.id);

    // const fetchPricePreview = async () => {
    //   try {
    //     const data = await getOrderPreviewBySessionIds(sessionIds);
    //     setOrderPreview(data.responses);
    //     // console.log(orderPreview)
    //   } catch (error) {
    //     toast.error(error.message || "Fetch preview failed");
    //   }
    // };
    // fetchPricePreview();
  }, []);

  return (
    <>
      <FeatureHeader title={`${t("order_summary")}`} />
      <div className={styles.mainContainer}>
        <div className="flex flex-col gap-10">
          <SmallButton text={t("go_back")} onClick={hdlGoBack}/>
          <OrderLineItemCard/>
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
