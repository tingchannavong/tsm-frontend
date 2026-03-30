import { useT } from "../languages/translations.js";
import { Outlet, useParams } from "react-router";
import styles from "../styles/Base.module.css";
import { useEffect, useState } from "react";
import { getLocationById } from "../api/location.js";

function SessionLayout() {
  const t = useT();
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getLocationById(id);
        setLocation(data.responses);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };
    fetchLocation();
  }, [id]);

  return (
    <div className={`${styles.mainContainer}`}>
      <h1 className={`${styles.title}`}>
        {t("sessions")} {t("location")}: {location && location.name}
      </h1>
      <Outlet/>
    </div>
  );
}

export default SessionLayout;
