import { useEffect } from "react";
import SessionCard from "../components/SessionCard";
import { useT } from "../languages/translations";
import { useLocation } from "react-router";

function ViewSessions() {
  const t = useT();

  const path = useLocation();
  const groupId = path.state ? path.state.groupId: null;

  useEffect(() => {
    // fetch locations
    // here
  }, []);

  return (
    <div>
      <h1>Group: 3 people, Started: ~10:00AM</h1>
      <SessionCard />
    </div>
  );
}

export default ViewSessions;
