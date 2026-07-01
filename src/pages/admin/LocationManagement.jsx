import { useNavigate } from "react-router";
import styles from "../../styles/Base.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";
import SmallButton from "../../components/SmallButton.jsx";

function LocationManagement() {
   const navigate = useNavigate();
  const t = useT();

  const user = useUserStore((state) => state.user);

   const hdlGoToFloorPlan = () => navigate("/tsm/admin/floorplan");

  return (
    <>
      <FeatureHeader title={`${t("loc_management")}`} />
      <div className={`${styles.mainContainer} ${styles.bigScreenStyles2}`}>
     {/* All users table */}
      <SmallButton text={t("floor_plan")} color="bg-[#964B00]" onClick={hdlGoToFloorPlan}/>
     <p>Create new location</p>
     <p>Location Table: coming soon!</p>
      </div>
    </>
  );
}

export default LocationManagement