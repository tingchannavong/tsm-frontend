
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStores.js";
import { useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";

function FloorPlan() {
    const t = useT();
  const navigate = useNavigate();
  // way of needing to re-render
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function hdlLogout() {
    logout();
    navigate('/tsm/login');
  }

  // useEffect(() => {
  //   // way of just getting data
  //   const fetchUser = useAuthStore.getState().fetchUser;
  //   fetchUser();
  // }, []);

  return (
    <>
    <FeatureHeader title={`${t("tables")} - ${t("floor_plan")}`} />
    <div className={styles.mainContainer}>
      <p>ID: {user?.id}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <button className="bg-gray-200 border border-b-black p-1" onClick={hdlLogout}> Log Out  </button>
    </div>
    </>
  )
}

export default FloorPlan;