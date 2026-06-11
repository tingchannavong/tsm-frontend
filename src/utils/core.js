export function appendQueryParams(api, filters) {
    if (!filters || Object.keys(filters).length === 0) return api;

    const params = new URLSearchParams(filters).toString();
    api += `?${params}`;
  
  return api;
}