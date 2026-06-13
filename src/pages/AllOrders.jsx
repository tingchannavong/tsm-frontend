import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import SmallButton from "../components/SmallButton.jsx";
import { useEffect, useMemo, useState } from "react";
import {
  convertDateTimeTo24HrTime,
  convertDateTimeToDate,
} from "../utils/time.js";
import ActionSwitcher from "../components/ActionSwitcher.jsx";
import { useSessionStore } from "../stores/sessionStore.js";
import EditModal from "../components/EditSessionModal.jsx";
import DeleteModal from "../components/DeleteSessionModal.jsx";
import Swal from "sweetalert2";
import StatusSessionDD from "../components/StatusSessionDD.jsx";
import LocationDD from "../components/LocationDD.jsx";
import { useOrderStore } from "../stores/orderStores.js";

// To fix all still use session template
function AllOrders() {
  const t = useT();
  const [filters, setFilters] = useState({
    status: "PAID",
    startDate: "",
    endDate: ""
  });
  
  const fetchAllOrders = useOrderStore((state) => state.fetchAllOrders);
  const orders = useOrderStore((state) => state.orders);
  const currentOrder = useOrderStore((state) => state.currentOrder);

   // Watch the form filters. Whenever a user clicks a dropdown useEffect can run again
  // const activeFilters = watch();

  const handleStatusChange = (newValue) => {
    setFilters((prev) => ({
      ...prev,
      status: newValue,
    }));
  };

  useEffect(() => {
    fetchAllOrders();
    // console.log(orders);
  }, [filters]);

  return (
    <>
      <FeatureHeader title={`${t("order_management")}`} />
      <div className={`${styles.mainContainer} gap-5`}>
        <div className="flex gap-2 items-center">
          <p>{t("filter_status")}: </p>{" "}
          <StatusSessionDD
            value={filters.status}
            onChange={handleStatusChange}
          />
        </div>
           <div className="flex gap-2 items-center">
            <p>{t("filter_order_date")}: Today DEFAULT</p>
        </div>

        <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 border-collapse">
                <thead className="text-xs text-gray-800 uppercase font-bold bg-purple-200 border-b">
                  <tr>
                    {/* Sticky ID column for mobile */}
                    <th className="sticky left-0 z-10 bg-purple-200 px-4 py-4 font-bold">
                      ID
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("order_date")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("grand_total")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                       {t("discount")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                       {t("net_total")}
                    </th>
                     <th className="px-4 py-4 font-medium whitespace-nowrap">
                       {t("currency")}
                    </th>
                     <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("status")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap text-center">
                      {t("action")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders?.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-12 text-center text-gray-400 italic"
                      >
                        {orders === null
                           ? t("init_orders") 
                          : t("no_order_found")}
                      </td>
                    </tr>
                  ) : (
                    orders?.map((order) => (
                      // id
                      <tr
                        key={order.id}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        {/* Sticky first column */}
                        <td className="sticky left-0 z-10 bg-white px-4 py-4 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50">
                          {order.id}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                          {`${convertDateTimeToDate(order.createdAt)}, ${convertDateTimeTo24HrTime(order.createdAt)}`}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800 capitalize">
                          {order.grandTotal ? Number(order.grandTotal).toLocaleString() : '-'}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                          {order.discount == 0 ? "None" : order.discount.toLocaleString()}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                          {order.netTotal ? Number(order.netTotal).toLocaleString() : '-'}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                          {order.orderDetails[0].currencyCode}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                          {order.status}
                        </td>
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <ActionSwitcher id={order.id} session={order} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditModal key={`edit-${currentOrder?.id || "none"}`} />
      <DeleteModal key={`del-${currentOrder?.id || "none"}`} />
    </>
  );
}

export default AllOrders;
