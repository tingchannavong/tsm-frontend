import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // or your framework's router

export function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 1. INPUT STATE: Always read current page/limit from the URL
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // 2. OUTPUT STATE: Store the backend results locally
  const [sessions, setSessions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // 3. THE TRIGGER: Fetch new data whenever the URL parameters change
  useEffect(() => {
    let isMounted = true; // Prevents race conditions if user clicks fast
    setIsLoading(true);

    async function fetchData() {
      try {
        // Your API call to the Prisma backend function we built
        const response = await fetch(`/api/sessions?page=${page}&limit=${limit}`);
        const result = await response.json();

        if (isMounted) {
          setSessions(result.data);
          setTotalPages(result.meta.totalPages); // Store total pages here!
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false; // Cleanup if component unmounts or page changes
    };
  }, [page, limit]); // <-- Crucial: Re-run when URL changes

  // 4. THE HANDLERS: To change pages, just update the URL!
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit });
  };

  if (isLoading) return <div>Loading sessions...</div>;

  return (
    <div>
      {/* 5. RENDER DATA */}
      <table>
        {/* Render your sessions rows here */}
      </table>

      {/* 6. RENDER CONTROLS using your local totalPages */}
      <div className="pagination-controls">
        <button 
          disabled={page <= 1} 
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button 
          disabled={page >= totalPages} 
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination