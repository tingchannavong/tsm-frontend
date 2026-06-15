import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import SmallButton from "../components/SmallButton.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  convertDateTimeTo24HrTime,
  convertDateTimeToDate,
  convertToDateString,
} from "../utils/time.js";
import ActionSwitcher from "../components/ActionSwitcher.jsx";
import { useSessionStore } from "../stores/sessionStore.js";
import EditSessionModal from "../components/sessions/EditSessionModal.jsx";
import DeleteSessionModal from "../components/sessions/DeleteSessionModal.jsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { endIndividualSessions } from "../api/session.js";
import { useNavigate, useParams } from "react-router";
import { getHomePath, havePermission } from "../utils/auth.js";
import { useSearchParams } from "react-router-dom";
import SessionFilterCard from "../components/sessions/SessionFilterCard.jsx";
import Pagination from "../components/Pagination.jsx";
// import { GetSessionsSchema } from "../validations/session.schema.js";

function AllSessions() {
  const t = useT();
  const navigate = useNavigate();

  const fetchAllSessions = useSessionStore((state) => state.fetchAllSessions);
  const sessions = useSessionStore((state) => state.sessions);
  const currentSession = useSessionStore((state) => state.currentSession);
  const setCurrentSession = useSessionStore(state => state.setCurrentSession);

  const [selectedSessions, setSelectedSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultFilters = {
    status: "ACTIVE",
    locationId: "all",
    page: 1,
    limit: 10,
    startDate: "",
    endDate: new Date().toISOString().split("T")[0],
  };

  const [searchParams, setSearchParams] = useSearchParams(defaultFilters);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  // CREATE ORDER FEATURE
  const hdlCheckboxChange = (sessionId) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId],
    );
  };

  const hdlSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = sessions.map((s) => s.id);
      setSelectedSessions(allIds);
    } else {
      setSelectedSessions([]);
    }
  };

  const hdlCreateOrder = () => {
    if (selectedSessions.length === 0) {
      console.log('0 session');
      alert('Please select sessions to create order.')
      toast.error("Please select sessions to create order!");
      return;
    }
    console.log('we do this')
    const fetchEndIndividualSessions = async () => {
      try {
        await endIndividualSessions({
          status: "ENDED",
          sessionIds: selectedSessions,
        });
        console.log("selected session IDs:", selectedSessions);
        sessionStorage.setItem("sessionIds", JSON.stringify(selectedSessions));
        toast.success("End individual sessions success");
        // GO TO ORDER SUMMARY PREVIEW
        navigate(`${getHomePath()}/sessions/order-preview`);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "End session request failed.");
      }
    };
    fetchEndIndividualSessions();
    setSelectedSessions([]);
  };

// ACTION SWITCHER
const getSessionActions = (session) => [
    {
      label: t("edit"),
      onClick: () => {
        setCurrentSession(session);
        setTimeout(() => document.getElementById("edit_session_modal")?.showModal(), 10);
      },
    },
    {
      label: t("delete"),
      onClick: () => {
        setCurrentSession(session);
        setTimeout(() => document.getElementById("delete_session_modal")?.showModal(), 10);
      },
    },
  ];

  const fetchData = async (filters) => {
    try {
      setIsLoading(true);
      const data = await fetchAllSessions(filters);
      console.log("data", data);
      // set total Pages
      setTotalPages(data.responses.totalPages);
      setTotalRecords(data.responses.totalRecords);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // console.log("when refetch", Object.fromEntries([...searchParams]));
    fetchData(Object.fromEntries([...searchParams]));
  }, [searchParams, setSearchParams]);

  return (
    <>
      <FeatureHeader title={`${t("session_management")}`} />
      <div className={`${styles.mainContainer} gap-5`}>
        <div className="flex gap-2">
          <SmallButton
            text={t("filter")}
            color="bg-blue-600 font-semibold"
            onClick={() => setShowFilter(!showFilter)}
          />
          <SmallButton
            text={t("create_order")}
            color="bg-[#2D877C] font-semibold w-40"
            onClick={hdlCreateOrder}
          />
        </div>
        {showFilter && (
        <SessionFilterCard setSearchParams={setSearchParams} searchParams={searchParams} setShowFilter={setShowFilter} defaultFilters={defaultFilters}/>
        )}

        <div className="w-full max-w-7xl mx-auto p-2 flex flex-col gap-5">
          <p>Search / Filter Results: <strong>{totalRecords}</strong></p>
          {/* Table design */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 border-collapse">
                <thead className="text-xs text-gray-800 uppercase font-bold bg-purple-200 border-b">
                  <tr>
                    {/* Sticky ID column for mobile */}
                    <th className="sticky left-0 z-10 bg-purple-200 px-4 py-4 font-bold">
                      <input
                        type="checkbox"
                        onChange={hdlSelectAll}
                        checked={selectedSessions.length === sessions.length}
                      />
                    </th>
                    <th className="sticky left-0 z-10 bg-purple-200 px-4 py-4 font-bold">
                      ID
                    </th>
                    <th className="sticky left-0 z-10 bg-purple-200 px-4 py-4 font-bold">
                      {t("start_time")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("location")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("name")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("group_id")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("end_time")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("session_date")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap">
                      {t("status")}
                    </th>
                    <th className="px-4 py-4 font-medium whitespace-nowrap text-center">
                      {t("action")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {sessions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-12 text-center text-gray-400 italic"
                      >
                        {sessions === null
                          ? t("init_sessions")
                          : t("no_session_found")}
                      </td>
                    </tr>
                  ) : (
                    sessions.map((session) => (
                      // id
                      <tr
                        key={session.id}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        {/* Sticky first column */}
                        <td className="sticky left-0 z-10 bg-white px-4 py-4 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50">
                          <input
                            type="checkbox"
                            value={session.id}
                            checked={selectedSessions.includes(session.id)}
                            onChange={() => hdlCheckboxChange(session.id)}
                          />
                        </td>
                        <td className="sticky left-0 z-10 bg-white px-4 py-4 font-semibold text-gray-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-blue-50">
                          {session.id}
                        </td>
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
                          <ActionSwitcher actions={getSessionActions(session)}/>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        { totalRecords == 0 ? <></> : 
        <Pagination searchParams={searchParams} setSearchParams={setSearchParams} totalPages={totalPages}/>
        }
      </div>
      <EditSessionModal key={`edit-${currentSession?.id || "none"}`} />
      <DeleteSessionModal key={`del-${currentSession?.id || "none"}`} />
    </>
  );
}

export default AllSessions;
