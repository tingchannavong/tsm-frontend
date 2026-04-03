import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import SmallButton from "../components/SmallButton.jsx";
import { useEffect, useMemo, useState } from "react";
import {
  convertDateTimeTo24HrTime,
  convertDateTimeToDate,
} from "../utils/time.js";
import ActionSwitcher from "../components/ActionSwitcher.jsx";
import { useSessionStore } from "../stores/sessionStore.js";
import EditModal from "../components/EditSessionModal.jsx";
import DeleteModal from "../components/DeleteSessionModal.jsx";
import Swal from "sweetalert2";
import StatusSessionDD from "../components/StatusSessionDD.jsx";
import LocationDD from "../components/LocationDD.jsx";

function AllSessions() {
  const t = useT();
  const [filters, setFilters] = useState({
    status: "ACTIVE",
    location: "all",
    search: "",
  });
  const fetchAllSessions = useSessionStore((state) => state.fetchAllSessions);
  const sessions = useSessionStore((state) => state.sessions);
  const currentSession = useSessionStore((state) => state.currentSession);

  const handleStatusChange = (newValue) => {
    setFilters((prev) => ({
      ...prev,
      status: newValue,
    }));
  };

  const handleLocationChange = (newValue) => {
    setFilters((prev) => ({
      ...prev,
      location: newValue,
    }));
  };

// handle filter of data
  const filteredData = useMemo(() => {
    // filter status
    const filteredStatus = sessions.filter((session) => filters.status === "all" ? session : filters.status === session.status);
    // filter location
    const filteredLocation = filteredStatus.filter((session) => filters.location === 'all' ? session : filters.location === session.location.name)

    return filteredLocation;
  }, [sessions, filters]);

  useEffect(() => {
    fetchAllSessions();
    // console.log(sessions)
  }, []);

  return (
    <>
      <FeatureHeader title={`${t("session_management")}`} />
      <div className={`${styles.mainContainer} gap-5`}>
        <SmallButton
          text={t("add")}
          color="bg-[#2D877C] font-semibold"
          onClick={() =>
            Swal.fire({
              text: "Coming Soon!",
            })
          }
        />
        <div className="flex gap-2 items-center">
          <p>Filter by status: </p>{" "}
          <StatusSessionDD
            value={filters.status}
            onChange={handleStatusChange}
          />
        </div>
           <div className="flex gap-2 items-center">
        <p>Filter by location: </p>
        <LocationDD 
        value={filters.location}
        onChange={handleLocationChange}
        />
        </div>
        {/* <p>Filter by play date: Today DEFAULT</p> LATER FEAT*/}
        {/* <p>Search by guest name: search bar</p> */}

        <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 border-collapse">
                <thead className="text-xs text-gray-800 uppercase font-bold bg-purple-200 border-b">
                  <tr>
                    {/* Sticky ID column for mobile */}
                    <th className="sticky left-0 z-10 bg-purple-200 px-4 py-4 font-bold">
                      Start Time
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      Location
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      Name
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      Group Id
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      End Time
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      Play Date
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-12 text-center text-gray-400 italic"
                      >
                        {filteredData === null
                          ? "Initialising sessions..."
                          : "No active sessions found."}
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((session) => (
                      // id
                      <tr
                        key={session.id}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        {/* Sticky first column */}
                        <td className="sticky left-0 z-10 bg-white px-4 py-4 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50">
                          {convertDateTimeTo24HrTime(session.startTime)}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                          {session.location.name}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800 capitalize">
                          {session.name}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                          {session.groupId.split("-")[0]}...
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                          {session.endTime
                            ? convertDateTimeTo24HrTime(session.endTime)
                            : "N/A"}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                          {session.startTime
                            ? convertDateTimeToDate(session.startTime)
                            : "N/A"}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              session.status === "ACTIVE"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                                session.status === "ACTIVE"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            ></span>
                            {session.status}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <ActionSwitcher id={session.id} session={session} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditModal key={`edit-${currentSession?.id || "none"}`} />
      <DeleteModal key={`del-${currentSession?.id || "none"}`} />
    </>
  );
}

export default AllSessions;
