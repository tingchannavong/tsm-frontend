import { useNavigate } from "react-router";
import styles from "../../styles/Base.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";

function PricingManagement() {
   const navigate = useNavigate();
  const t = useT();

  const user = useUserStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      <FeatureHeader title={`${t("pricing_management")}`} />
      <div className={`${styles.mainContainer} ${styles.bigScreenStyles2}`}>
        {/* create new pricing button */}
     {/* All users table */}
     <p>Create New Pricing</p>
     <p>Pricing Table: coming soon!</p>
      </div>
    </>
  );
}

export default PricingManagement