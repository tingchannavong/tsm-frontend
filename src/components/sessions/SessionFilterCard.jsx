import styles from "../../styles/Base.module.css";
import { useT } from "../../languages/translations.js";
import { useForm } from "react-hook-form";
import { getAllLocations } from "../../api/location.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SessionFilterCard({
  setSearchParams,
  searchParams,
  setShowFilter,
  defaultFilters,
}) {
  const t = useT();
  const [locations, setLocations] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: (() => {
      const urlFilters = Object.fromEntries([...searchParams]);
      return {
        ...defaultFilters,
        ...urlFilters,
      };
    })(),
    // resolver: zodResolver(GetSessionsSchema),
  });

  const submitData = (filtersPayload) => {
    // set URL search params
    console.log("filtersPayload", filtersPayload);
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      ...filtersPayload,
    }));
    console.log(Object.fromEntries(searchParams));
    setShowFilter(false);
  };

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const data = await getAllLocations();
        const sortedTables = data.responses.sort((a, b) => {
          return a.displayName.localeCompare(b.displayName);
        });
        setLocations(sortedTables);
        console.log('locations', locations)
      } catch (error) {
        console.error("Failed to fetch all sessions:", error);
        toast.error(error.response.data.message);
      }
    };
    fetchAllLocations();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col gap-5 border p-4 "
    >
      <div className="flex gap-2 items-center justify-between">
        <p>{t("filter_status")}: </p>{" "}
        <select {...register("status")} className={styles.dropDown}>
          <option value="ACTIVE">{t("active")}</option>
          <option value="ENDED">{t("ended")}</option>
          <option value="BILLED">{t("billed")}</option>
          <option value="CANCELLED">{t("cancelled")}</option>
          <option value="all">{t("all")}</option>
        </select>
      </div>
      <div className="flex gap-2 justify-between">
        <p>{t("filter_location")}: </p>
        <select {...register("locationId")} className={styles.dropDown}>
          <option value="all">{t("all")}</option>
          {locations &&
            locations.map((each) => (
                <option value={each.id}>{each.name}</option>
            ))}
        </select>
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
  );
}

export default SessionFilterCard;
