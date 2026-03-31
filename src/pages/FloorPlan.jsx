
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";

function FloorPlan() {
  const t = useT();
  const navigate = useNavigate();
  
  const logout = useAuthStore((state) => state.logout);

  // useEffect(() => {
  //   // way of just getting data
  //   const fetchUser = useAuthStore.getState().fetchUser;
  //   fetchUser();
  // }, []);

  return (
    <>
    <FeatureHeader title={`${t("tables")} - ${t("floor_plan")}`} />
    <div className={styles.mainContainer}>
      To fetch Floor Plan
    </div>
    </>
  )
}

export default FloorPlan;