import styles from "../styles/Base.module.css";
import SmallButton from "./SmallButton";
import { useT } from "../languages/translations.js";

function Pagination({searchParams, setSearchParams, totalPages}) {
  const t = useT();

  // PAGINATION AND FILTERS
  const hdlLimitChange = (e) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: "1",
      limit: e.target.value,
    }));
    console.log('search limit change', searchParams)
  };

  const hdlPageChange = (pageNumber) => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: pageNumber,
    }));
  };

  const pageButtonsStyle = "bg-base-300 font-semibold w-15 p-1 rounded-sm"
  const pageNumberStyle = "bg-base-300 w-10 h-10 rounded-full"
  const activePageNumberStyle = "bg-blue-300 w-10 h-10 rounded-full"

  return (
    <div>
       <div className="flex gap-10">
        {/* SHOW SECTION  */}
            <div className="flex justify-start items-center gap-2">
            <label htmlFor="show records">
              Show:
              </label>
              <select onChange={hdlLimitChange} className=" bg-gray-100 rounded-sm z-1 w-15 p-2 shadow-sm border-black;">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
            {/* PAGES SECTION */}
              <div className="flex justify-start items-center gap-4">
                {searchParams.get("page") == "1" ? (
                  <></>
                ) : (
                  <button
                    className={pageButtonsStyle}
                    onClick={() => {
                      const currentPage = searchParams.get("page");
                      setSearchParams((prev) => ({
                        ...Object.fromEntries(prev),
                        page: Number(currentPage) - 1,
                      }));
                    }}
                  >
                    {t("prev")}
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => hdlPageChange(pageNumber)}
                      className={
                        pageNumber == searchParams.get("page")
                          ? activePageNumberStyle
                          : pageNumberStyle
                      }
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {searchParams.get("page") == totalPages ? (
                  <></>
                ) :    (
                  <button
                    className={pageButtonsStyle}
                    onClick={() => {
                      const currentPage = searchParams.get("page");
                      setSearchParams((prev) => ({
                        ...Object.fromEntries(prev),
                        page: currentPage + 1,
                      }));
                    }}
                  >
                    {t("next")}
                  </button>
                )
                
                }
                {/* end pages */}
              </div>

          </div>
        </div>
  )
}

export default Pagination