import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { useT } from "../languages/translations";
import { useLocation, useParams } from "react-router";
import { getSessionsByLocationGroup } from "../api/session.js";
import { convertDateTimeTo24HrTime } from "../utils/time.js";

function ViewSessions() {
  const t = useT();
  const { id } = useParams();
  console.log(id);

  const path = useLocation();
  const groupId = path.state ? path.state.groupId: null;
  console.log(groupId)
  const [selectedGroup, setSelectedGroup] = useState(null);
  // const selectedGroup = path.state?.selectedGroup; // drawback group state dont trigger reload

  useEffect(() => {
      const fetchGroupSessions = async () => {
        try {
          const data = await getSessionsByLocationGroup(id, groupId);;
          console.log(data)
          setSelectedGroup(data);
        } catch (error) {
          console.error("Failed to fetch group sessions:", error);
        }
      };
      fetchGroupSessions();
    }, []);

  return (
    <div>
      <h1>Group: 3 people, Started: ~10:00AM</h1>
      {/* {`${t("people")} ${t("started")}: ~ ${convertDateTimeTo24HrTime(each.items[0].startTime)}`} */}
      <SessionCard />
    </div>
  );
}

export default ViewSessions;
