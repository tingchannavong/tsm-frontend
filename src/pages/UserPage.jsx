import { useEffect } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import UserCard from "../components/UserCard.jsx";
import Button from "../components/Button.jsx";
import { useT } from "../languages/translations.js";

function UserPage() {
  const navigate = useNavigate();
  const t = useT();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function hdlLogout() {
    logout();
    navigate("/tsm/login");
  }

  // useEffect(() => {
    // LATER: when separate fetch user logic from user service
  //   const fetchUser = useAuthStore.getState().fetchUser;
  //   fetchUser();
  // }, []);
  const bigScreenStyles="xl:justify-center xl:items-center";

  return (
    <>
      <FeatureHeader title={`${t("my_profile")}`} />
      <div className={`${styles.mainContainer} ${bigScreenStyles}`}>
        <UserCard
          id={user?.id}
          username={user?.username}
          email={user?.email}
          firstname={user?.firstname}
          lastname={user?.lastname}
          phone={user?.phone}
        />
        <Button text={t("log_out")} color="bg-black mt-5" onClick={hdlLogout} />
      </div>
    </>
  );
}

export default UserPage;
