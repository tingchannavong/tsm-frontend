import { useNavigate } from "react-router";
import styles from "../../styles/Base.module.css";
import FeatureHeader from "../../components/FeatureHeader.jsx";
import Button from "../../components/Button.jsx";
import { useT } from "../../languages/translations.js";
import { useUserStore } from "../../stores/userStores.js";
import SmallButton from "../../components/SmallButton.jsx";

function UserManagement() {
  const navigate = useNavigate();
  const t = useT();

  const user = useUserStore((state) => state.user);

  return (
    <>
      <FeatureHeader title={`${t("user_management")}`} />
      <div className={`${styles.mainContainer} ${styles.bigScreenStyles2}`}>
         <SmallButton
            text={t("create_user")}
            color="bg-[#2D877C] font-semibold w-40"
            onClick={() => navigate("/tsm/admin/register-user")}
          />
        <p>generate invite link</p>
     {/* All users table */}
     <p>User Table: coming soon!</p>
      </div>
    </>
  );
}
export default UserManagement