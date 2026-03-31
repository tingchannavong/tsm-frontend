import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import SmallButton from "../components/SmallButton.jsx";
import { useEffect, useState } from "react";
import { getAllSessions } from "../api/session.js";
import { convertDateTimeTo24HrTime } from "../utils/time.js";

function AllSessions() {
  const t = useT();
const [sessions, setSessions] = useState([]); 

  useEffect(() => {
    const fetchAllSessions = async () => {
          try {
            const data = await getAllSessions();
            setSessions(data.responses);
          } catch (error) {
            console.error("Failed to fetch all sessions:", error);
          }
        };
    fetchAllSessions();
  }, []);

  return (
    <>
      <FeatureHeader title={`${t("session_management")}`} />
      <div className={styles.mainContainer}>
        <SmallButton text={t("add")} color="bg-[#2D877C] font-semibold"/>
        <p>Filter by status: ACTIVE DEFAULT</p>
        <p>Filter by location: Table 1</p>
        <p>Search by guest name: name</p>

<div className="w-full max-w-7xl mx-auto p-2 md:p-4">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 border-collapse">
            <thead className="text-xs text-gray-800 uppercase font-bold bg-purple-200 border-b">
              <tr>
                {/* Sticky ID column for mobile */}
                <th className="sticky left-0 z-10 bg-purple-200 px-4 py-4 font-bold">
                  ID
                </th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Location</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Guest Number</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Name</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Start Time</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">End Time</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Time Elapse</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-400 italic">
                    {sessions === null ? "Initialising sessions..." : "No active sessions found."}
                  </td>
                </tr>
              ) : (
                sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-blue-50/30 transition-colors">
                    {/* Sticky ID Cell */}
                    <td className="sticky left-0 z-10 bg-white px-4 py-4 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50">
                      #{session.id}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                      {session.locationId.split('-')[0]}...
                    </td>

                    <td className="px-4 py-4 text-center">1</td>

                    <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-800 capitalize">
                      {session.name}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        session.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${
                          session.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        {session.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                      {convertDateTimeTo24HrTime(session.startTime)}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                      {session.endTime ? convertDateTimeTo24HrTime(session.endTime) :"N/A"}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap font-mono text-xs">
                      {/* Placeholder for your manual elapse logic */}
                      --:--
                    </td>

                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 rounded-md hover:bg-blue-100 transition-all">
                        Edit
                      </button>
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
    </>
  );
}

export default AllSessions;
