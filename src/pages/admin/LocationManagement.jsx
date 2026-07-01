import { useNavigate } from "react-router";
import styles from "../../styles/Base.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";

function LocationManagement() {
   const navigate = useNavigate();
  const t = useT();

  const user = useUserStore((state) => state.user);

  return (
    <>
      <FeatureHeader title={`${t("loc_management")}`} />
      <div className={`${styles.mainContainer} ${styles.bigScreenStyles2}`}>
     {/* All users table */}
     <p>Create new location</p>
     <p>Location Table: coming soon!</p>
     <p>Floor Plan button</p>
      </div>
    </>
  );
}

export default LocationManagement