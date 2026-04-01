import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import { getAllLocations } from "../api/location.js";

function FloorPlan() {
  const t = useT();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]); 
  

  useEffect(() => {
    // const fetchAllLocations = async () => {
    //   try {
    //     const data = await getAllLocations();
    //     setSessions(data.responses);
    //     console.log(locations)
    //   } catch (error) {
    //     console.error("Failed to fetch all sessions:", error);
    //   }
    // };
    // fetchAllLocations();
  }, []);

  return (
    <>
      <FeatureHeader title={`${t("tables")} - ${t("floor_plan")}`} />
      <div className={styles.mainContainer}>To fetch Floor Plan</div>
    </>
  );
}

export default FloorPlan;
