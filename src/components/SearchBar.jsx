import { useState, useEffect } from "react";

function SearchBar({onSearch, searchField, placeholder = "Search..."}) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const delayedDebounceTimer = setTimeout(() => {
        onSearch({[searchField]: searchTerm.trim()});
    }, 400);

    return () => clearTimeout(delayedDebounceTimer); // clean up

  }, [searchTerm, onSearch]);

  return (
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
        <input type="search" required placeholder={placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </label>
    </div>
  );
}

export default SearchBar;
