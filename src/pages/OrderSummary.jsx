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

function OrderSummary({ selectedGroup }) {
  const t = useT();

    const hdlGoBack = () => {}
    const hdlSubmitOrder = () => {}

  useEffect(() => {
    console.log(selectedGroup)
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
