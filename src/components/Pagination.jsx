import React from 'react'

function Pagination({searchParams, setSearchParams, totalPages}) {

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

  return (
    <div>
       <div>
          <div className="flex justify-center gap-2">
            <label htmlFor="show records">
              Show:
              <select onChange={hdlLimitChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </label>
          </div>
          <div className="flex gap-2">
            {/* pages */}
              <>
                <p>Pages:</p>
                {searchParams.get("page") == "1" ? (
                  <></>
                ) : (
                  <button
                    onClick={() => {
                      const currentPage = searchParams.get("page");
                      setSearchParams((prev) => ({
                        ...Object.fromEntries(prev),
                        page: currentPage - 1,
                      }));
                    }}
                  >
                    Prev
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
                          ? "bg-blue-400"
                          : "bg-base-100"
                      }
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {searchParams.get("page") == totalPages ? (
                  <></>
                ) : (
                  <button
                    onClick={() => {
                      const currentPage = searchParams.get("page");
                      setSearchParams((prev) => ({
                        ...Object.fromEntries(prev),
                        page: currentPage + 1,
                      }));
                    }}
                  >
                    Next
                  </button>
                )}
                {/* end pages */}
              </>
          </div>
        </div>
    </div>
  )
}

export default Pagination