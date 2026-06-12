import styles from "../styles/Base.module.css";
import FeatureHeader from "../components/FeatureHeader.jsx";
import { useT } from "../languages/translations.js";
import SmallButton from "../components/SmallButton.jsx";
import { useEffect, useMemo, useState } from "react";
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
import StatusSessionDD from "../components/StatusSessionDD.jsx";
import LocationDD from "../components/LocationDD.jsx";
import { useForm } from "react-hook-form";
// import { GetSessionsSchema } from "../validations/session.schema.js";

function AllSessions() {
  const t = useT();
  const [showFilter, setShowFilter] = useState(false);

  const fetchAllSessions = useSessionStore((state) => state.fetchAllSessions);
  const sessions = useSessionStore((state) => state.sessions);
  const currentSession = useSessionStore((state) => state.currentSession);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "ACTIVE",
      locationId: "all",
      search: "",
      page: 1,
      limit: 20,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
    // resolver: zodResolver(GetSessionsSchema),
  });

  const submitData = (data) => {
    fetchAllSessions(data);
    setShowFilter(false);
    // console.log("filters at submit", filters);
  };

  useEffect(() => {
    const initialFilters = getValues();
    fetchAllSessions(initialFilters);
  }, []);

  return (
    <>
      <FeatureHeader title={`${t("session_management")}`} />
      <div className={`${styles.mainContainer} gap-5`}>
        <div className="flex gap-2">
          <SmallButton
            text={t("add")}
            color="bg-[#2D877C] font-semibold"
            onClick={() =>
              Swal.fire({
                text: "Coming Soon!",
              })
            }
          />
          <SmallButton
            text={t("filter")}
            color="bg-blue-600 font-semibold"
            onClick={() => setShowFilter(true)}
          />
        </div>
        <p>{t("search_name")}: search bar</p>

        {showFilter && (
          <form
            onSubmit={handleSubmit(submitData)}
            className="flex flex-col gap-5 border p-4"
          >
            <div className="flex gap-2 items-center">
              <p>{t("filter_status")}: </p>{" "}
              <StatusSessionDD
                {...register("status")}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>{t("filter_location")}: </p>
              <LocationDD
                {...register("locationId")}
              />
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
            <button
              type="submit"
              className="bg-blue-600 font-semibold mx-auto text-white p-2 rounded"
            >
              {t("submit")}
            </button>
          </form>
        )}
        <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 border-collapse">
                <thead className="text-xs text-gray-800 uppercase font-bold bg-purple-200 border-b">
                  <tr>
                    {/* Sticky ID column for mobile */}
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
