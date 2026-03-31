import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { useT } from "../languages/translations";
import { useLocation, useParams } from "react-router";
import { getSessionsByLocationGroup } from "../api/session.js";
import { convertDateTimeTo24HrTime } from "../utils/time.js";

function ViewSessions() {
  const t = useT();
  const { id } = useParams();
  const path = useLocation();
  const groupId = path.state ? path.state.groupId: null;

  const [selectedGroup, setSelectedGroup] = useState(null);
  // drawback group update no state to trigger reload // const selectedGroup = path.state?.selectedGroup; 

  useEffect(() => {
      const fetchGroupSessions = async () => {
        try {
          const data = await getSessionsByLocationGroup(id, groupId);
          console.log(data.sameStartTimes)
          setSelectedGroup(data.sameStartTimes);
        } catch (error) {
          console.error("Failed to fetch group sessions:", error);
        }
      };
      fetchGroupSessions();
    }, []);

  return (
    <div>
      {/* {`${t("people")} ${t("started")}: ~ ${convertDateTimeTo24HrTime(each.items[0].startTime)}`} */}
      <SessionCard />
    </div>
  );
}

export default ViewSessions;
