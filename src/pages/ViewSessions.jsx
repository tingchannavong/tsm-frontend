import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { useT } from "../languages/translations";
import { useLocation, useParams } from "react-router";
import { getSessionsByLocationGroup } from "../api/session.js";
import { convertDateTimeToDate, getElapsedTime } from "../utils/time.js";

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
          // TO DO GET ESTIMATED PRICE
          console.log(data.sameStartTimes)
          setSelectedGroup(data.sameStartTimes);
        } catch (error) {
          console.error("Failed to fetch group sessions:", error);
        }
      };
      fetchGroupSessions();
    }, []);

  return (
    <div className="flex flex-col gap-10">
      {selectedGroup && selectedGroup.map( (each, i) => {
        const people = each.items.length;
        const names = each.items.map( (item) => item.name);
        const date = convertDateTimeToDate(each.items[0].startTime);
        const timeElapsed = getElapsedTime(each.items[0].startTime);
        const startTime = each.startTime;
        return <SessionCard key={each.id} startTime={startTime} people={people} names={names} date={date} timeElapsed={timeElapsed} group={each}/>
      })
    }
    </div>
  );
}

export default ViewSessions;
