import { useEffect, useState } from "react";
import { useT } from "../languages/translations.js";
import { getAllLocations } from "../api/location.js";


function LocationDD({ value, onChange }) {
  const t = useT();
  const [locations, setLocations] = useState([]); 

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const data = await getAllLocations();
        const sortedTables = data.responses.sort((a, b) => {
          return a.displayName.localeCompare(b.displayName)
        })
        setLocations(sortedTables);
      } catch (error) {
        console.error("Failed to fetch all sessions:", error);
      }
    };
    fetchAllLocations();
  }, []);

  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm border-black">
         <option value="all">
          {t("all")}
        </option>
        {locations && locations.map((each) => (
          <>
        <option value={each.name}>
          {each.name}
        </option>
          </>
        ))
        }  
      </select>
    </div>
  );
}

export default LocationDD;
