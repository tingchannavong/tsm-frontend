import { useEffect } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";

function DashboardPage() {
  const navigate = useNavigate();
  const t = useT();

  const user = useAuthStore((state) => state.user);
  console.log(user);
  const logout = useAuthStore((state) => state.logout);

  function hdlLogout() {
    logout();
    navigate("/tsm/login");
  }

  // useEffect(() => {
  //   // way of just getting data
  //   const fetchUser = useAuthStore.getState().fetchUser;
  //   fetchUser();
  // }, []);

  return (
    <>
      <FeatureHeader title={`${t("my_profile")}`} />
      <div className={styles.mainContainer}>
        <div className="m-10">
          User Page
          <p>ID: {user?.id}</p>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <button
            className="bg-gray-200 border border-b-black p-1"
            onClick={hdlLogout}
          >
            {" "}
            Log Out{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
