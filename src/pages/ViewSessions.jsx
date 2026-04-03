import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { useT } from "../languages/translations";
import { useLocation, useNavigate, useParams } from "react-router";
import { endGroupSession, getSessionsByLocationGroup } from "../api/session.js";
import {
  convertDateTimeToDate,
  convertToDateString,
  getElapsedTime,
} from "../utils/time.js";
import { getHomePath, havePermission } from "../utils/auth.js";
import Button from "../components/Button.jsx";
import { toast } from "react-toastify";
import { mapSessionIdsFromGroup } from "../utils/session.util.js";

function ViewSessions() {
  const canView = havePermission();
  const t = useT();
  const navigate = useNavigate();
  const { id } = useParams();
  const path = useLocation();
  const groupId = path.state ? path.state.groupId : null;

  const [selectedGroup, setSelectedGroup] = useState(null);
  // drawback group update no state to trigger reload // const selectedGroup = path.state?.selectedGroup;

  const hdlEndGroupSession = () => {
    // get group id
    const fetchEndGroup = async () => {
      // TO DO END MODAL OF ARE YOU SURE? GROUP SUMMARY
      try {
      await endGroupSession(groupId, {
        status: "ENDED",
      });

      const pendingEndSessionIds = mapSessionIdsFromGroup(selectedGroup);
      console.log('pendingEndSessionIds', pendingEndSessionIds)
      sessionStorage.setItem("sessionIds", JSON.stringify(pendingEndSessionIds));
      // GO TO ORDER SUMMARY PREVIEW
      navigate(`${getHomePath()}/sessions/order-preview`);
      // navigate state lost due to public to private loader
    
      toast.success('End sessions success');
      } catch (error) {
        toast.error(error.message || 'End session request failed.')
      }
    };

    fetchEndGroup();
  };

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
    <div className="flex flex-col gap-10">
      {selectedGroup &&
        selectedGroup.map((each, i) => {
          const people = each.items.length;
          const names = each.items.map((item) => item.name);
          const date = convertDateTimeToDate(each.items[0].startTime);
          const timeElapsed = getElapsedTime(each.items[0].startTime);
          const startTime = each.startTime;
          return (
            <SessionCard
              key={each.id}
              startTime={startTime}
              people={people}
              names={names}
              date={date}
              timeElapsed={timeElapsed}
              group={each}
            />
          );
        })}
      {canView && (
        <Button
          text={t("end_all_session")}
          color="bg-black"
          onClick={hdlEndGroupSession}
        />
      )}
    </div>
  );
}

export default ViewSessions;
