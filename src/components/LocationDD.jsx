import { useEffect, useState } from "react";
import { useT } from "../languages/translations.js";
import { getAllLocations } from "../api/location.js";
import { forwardRef } from "react";

const LocationDD = forwardRef(({ ...props }, ref) => {
  const t = useT();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const data = await getAllLocations();
        const sortedTables = data.responses.sort((a, b) => {
          return a.displayName.localeCompare(b.displayName);
        });
        setLocations(sortedTables);
      } catch (error) {
        console.error("Failed to fetch all sessions:", error);
      }
    };
    fetchAllLocations();
  }, []);

  return (
    <div>
      <select
        ref={ref}
        {...props}
        className="bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm border-black"
      >
        <option value="all">{t("all")}</option>
        {locations &&
          locations.map((each) => (
            <>
              <option value={each.id}>{each.name}</option>
            </>
          ))}
      </select>
    </div>
  );
});

export default LocationDD;
