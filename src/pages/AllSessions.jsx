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
import EditModal from "../components/EditSessionModal.jsx";
import DeleteModal from "../components/DeleteSessionModal.jsx";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import StatusSessionDD from "../components/StatusSessionDD.jsx";
import LocationDD from "../components/LocationDD.jsx";
import { useForm } from "react-hook-form";
import SearchBar from "../components/SearchBar.jsx";
import { endIndividualSessions } from "../api/session.js";
import { useNavigate } from "react-router";
import { getHomePath, havePermission } from "../utils/auth.js";
// import { GetSessionsSchema } from "../validations/session.schema.js";

function AllSessions() {
  const t = useT();
  const navigate = useNavigate();

  const fetchAllSessions = useSessionStore((state) => state.fetchAllSessions);
  const sessions = useSessionStore((state) => state.sessions);
  const currentSession = useSessionStore((state) => state.currentSession);

  const [selectedSessions, setSelectedSessions] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: (() => {
      const params = new URLSearchParams(window.location.search);
      // console.log('params', params);
      // params.entries() loop through key-value pair, Object.fromEntries() make it into object
      const urlFilters = Object.fromEntries(params.entries());

      const defaultFilters = {
        status: "ACTIVE",
        locationId: "all",
        page: 1,
        limit: 5,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      };

      return {
        ...defaultFilters,
        ...urlFilters,
      };
    })(),

    // resolver: zodResolver(GetSessionsSchema),
  });

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
      toast.error('Please select sessions to create order!');
      return;
    }

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

  const submitData = (filtersPayload) => {
    // set URL param
    const currentURL = new URL(window.location.href);
    const newParams = new URLSearchParams(filtersPayload);
    // console.log('newParams', newParams);
    // console.log('.toString()', newParams.toString())
    currentURL.search = newParams.toString();
    // console.log('.search', currentURL.search )
    window.history.pushState({}, "", currentURL);

    fetchAllSessions(filtersPayload);
    setShowFilter(false);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const initialFilters = getValues();
      fetchAllSessions(initialFilters);

    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          <form
            onSubmit={handleSubmit(submitData)}
            className="flex flex-col gap-5 border p-4 "
          >
            <div className="flex gap-2 items-center justify-between">
              <p>{t("filter_status")}: </p>{" "}
              <StatusSessionDD {...register("status")} />
            </div>
            <div className="flex gap-2 items-center">
              <p>{t("filter_location")}: </p>
              <LocationDD {...register("locationId")} />
            </div>
            <p>{t("filter_session_date")}:</p>
            <div className="flex gap-2 items-center">
              <label className="label">Start Date</label>
              <input
                {...register("startDate")}
                type="date"
                className="input input-bordered"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label className="label">End Date</label>
              <input
                {...register("endDate")}
                type="date"
                className="input input-bordered"
              />
            </div>
            {/* search bar  */}
            <div>
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  {...register("name")}
                  type="text"
                  placeholder={t("search_name")}
                />
              </label>
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="bg-black font-semibold text-white p-2 rounded w-20"
                onClick={() =>
                  reset({
                    status: "all",
                    locationId: "all",
                    page: 1,
                    limit: 20,
                    startDate: "",
                    endDate: "",
                  })
                }
              >
                {t("reset")}
              </button>
              <button
                type="submit"
                className="bg-blue-600 font-semibold text-white p-2 rounded w-20"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        )}

        <div className="w-full max-w-7xl mx-auto p-2 flex flex-col gap-5">
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
                          <ActionSwitcher id={session.id} session={session} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* paginmation Component */}
          <div className="flex justify-center gap-2">
            <p>Results: How many?</p>
            <label htmlFor="show records">
              Show:
              <select>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <EditModal key={`edit-${currentSession?.id || "none"}`} />
      <DeleteModal key={`del-${currentSession?.id || "none"}`} />
    </>
  );
}

export default AllSessions;
