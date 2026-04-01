import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import { getAllLocations } from "../api/location.js";
import Table from "../components/Table.jsx";

function FloorPlan() {
  const t = useT();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]); 
  const [colNum, selColNum] = useState(2); 
  const [rowNum, selRowNum] = useState(5); 

  const hdlGoToLocSessions = async (id) => {
    navigate(`/tsm/sessions/${id}`);
  }

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const data = await getAllLocations();
        // console.log(data.responses);
        const sortedTables = data.responses.sort((a, b) => {
          return a.displayName.localeCompare(b.displayName)
        })
        setLocations(sortedTables);
        // console.log(locations)
      } catch (error) {
        console.error("Failed to fetch all sessions:", error);
      }
    };
    fetchAllLocations();
  }, []);

  // auto-rows-[80px] in case you need auto rows

  return (
    <>
      <FeatureHeader title={`${t("tables")} - ${t("floor_plan")}`} />
      <div className={`${styles.mainContainer} overflow-y-auto`}>
        {/* Rows Cols Go! */}
        <div className={`grid grid-flow-col grid-rows-${rowNum} gap-4 p-4`}>
        {/* <div className={`grid grid-cols-${colNum} grid-rows-${rowNum} gap-4 p-4`}> */}
          {locations && locations.map( table => <Table key={table.id} table={table} onClick={() => hdlGoToLocSessions(table.id)}/>)
          }
        </div>
      </div>
    </>
  );
}

export default FloorPlan;
