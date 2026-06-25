import { useEffect, useState } from "react";
import SessionCard from "../components/sessions/SessionCard";
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

function ViewOrderDetails() {
  const canView = havePermission();
  const t = useT();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentOrder = useOrderStore((state) => state.currentOrder);
  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);
  const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder);

  useEffect(() => {
   
    if (!currentOrder || currentOrder.id == id) {
      console.log('order id from param', id);
       // fetch order id
    }
    // Clear the state when the component unmounts
    return () => {
      clearCurrentOrder();
    };
  }, [id]);

  return (
    <>
    <FeatureHeader title={`${t("order_details")}`} />
    <div className="flex flex-col gap-10">
      {/* ORDER CARD ? */}
      <pre>{JSON.stringify(currentOrder, null, 2)}</pre>
    </div>
    </>
  );
}

export default ViewOrderDetails;
