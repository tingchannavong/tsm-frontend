import { useT } from "../languages/translations.js";
import { Outlet, useLocation, useParams, useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import { useEffect, useState } from "react";
import { getLocationById } from "../api/location.js";
import SmallButton from "../components/SmallButton.jsx";

function SessionLayout() {
  const t = useT();
  const navigate = useNavigate();
  const { id } = useParams();
  const path = useLocation();
  const [location, setLocation] = useState(null);
  const [isRoot, setIsRoot] = useState(true);

  // TO DO BACK TO EXACT SESSION INFO PAGE
  const hdlGoBack = () => navigate(-1);

  useEffect(() => {
    const rootPath = `/tsm/sessions/${id}`;
    if (path.pathname === rootPath) {
      setIsRoot(true);
    } else {
      setIsRoot(false);
    }
  }, [path.pathname]);

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
      {!isRoot && <SmallButton text={t("go_back")} onClick={hdlGoBack} />}
      <Outlet />
    </div>
  );
}

export default SessionLayout;
