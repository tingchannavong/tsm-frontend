import { useEffect, useState } from "react";
import styles from "../styles/Base.module.css";
import { useT } from "../languages/translations";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  convertDateTimeToDate,
  convertToDateString,
  getElapsedTime,
} from "../utils/time.js";
import { getHomePath, havePermission } from "../utils/auth.js";
import Button from "../components/Button.jsx";
import { toast } from "react-toastify";
import { useOrderStore } from "../stores/orderStores.js";
import FeatureHeader from "../components/FeatureHeader.jsx";
import SmallButton from "../components/SmallButton.jsx";
import OrderLineItemCard from "../components/orders/OrderLineItemCard.jsx";

function ViewOrderDetails() {
  const canView = havePermission();
  const t = useT();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentOrder = useOrderStore((state) => state.currentOrder);
  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);
  const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder);

  const hdlGoBack = () => navigate(-1);

  useEffect(() => {
    if (Object.keys(currentOrder).length === 0 || currentOrder.id == id || !currentOrder) {
      try {
        fetchOrderById(id);
      } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.message);
      }
    }
    // Clear the state when the component unmounts
    return () => {
      clearCurrentOrder();
    };
  }, [id]);

  return (
    <>
      <FeatureHeader title={`${t("order_details")}`} />
      {/* <div className="flex flex-col gap-10"> */}
        <div className={styles.mainContainer}>
          <div className="flex flex-col gap-1">
            <SmallButton text={t("go_back")} onClick={hdlGoBack} />
            <div className="bill-header">
              <p>
                Order ID: {currentOrder?.id}
              </p>
              <p>
                Order Date: {convertDateTimeToDate(currentOrder?.createdAt)}
              </p>
              <p>
                Order Status: {currentOrder?.status}
              </p>
              {/* <p>
              Hourly Price: {orderPreview?.items[0].basePrice * 60}{" "}
              {orderPreview?.items[0].currencyCode}
            </p> */}
              {currentOrder?.orderDetails?.map((line, i) => {
                return (
                  <OrderLineItemCard
                    key={line.displayName}
                    index={i}
                    displayName={line.displayName}
                    quantity={line.quantity}
                    unitPrice={line.unitPrice}
                    subTotal={line.subTotal?.toLocaleString()}
                    currency={line.currencyCode}
                    durationMin={line.durationMin}
                    sessions={line.sessions}
                  />
                );
              })}
            </div>
            <div className="flex flex-col items-end p-4 gap-4">
              <p>
                Grand Total: {currentOrder?.grandTotal?.toLocaleString()}{" "}
                {currentOrder?.orderDetails?.[0]?.currencyCode}
              </p>
              {currentOrder?.discount > 0 ? (
                <>
                  <p>
                    Discount: {currentOrder?.discount?.toLocaleString()}{" "}
                    {currentOrder?.orderDetails?.[0]?.currencyCode}
                  </p>
                  <p>
                    Net Total: {currentOrder?.netTotal?.toLocaleString()}{" "}
                    {currentOrder?.orderDetails?.[0]?.currencyCode}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* <pre>{JSON.stringify(currentOrder, null, 2)}</pre> */}
      {/* </div> */}
    </>
  );
}

export default ViewOrderDetails;
