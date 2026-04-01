import { useEffect, useState } from "react";
import { getAllSessions } from "../api/session.js";
import { toast } from "react-toastify";
import { useT } from "../languages/translations.js";

function Table({ table, onClick }) {
      const t = useT();
  const [tablePeople, setTablePeople] = useState(0);

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const sessions = await getAllSessions({ status: "ACTIVE", locationId: table.id });
        setTablePeople(sessions.responses.length)
      } catch (error) {
        toast.error(error.message || "Failed to fetch sessions");
      }
    };

    fetchActiveSessions();
  }, []);

  const takenStyles =
    "w-40 h-40 bg-[#964B00] flex flex-col items-center justify-center text-white";
  const empptyStyles =
    "w-40 h-40 bg-[#EEF2F1] flex flex-col items-center justify-center text-black";

  return (
    <div className={!tablePeople ? empptyStyles : takenStyles} onClick={onClick}>
      <p>{table.name}</p>
      <p>{t("people")} {tablePeople}</p>
    </div>
  );
}

export default Table;
