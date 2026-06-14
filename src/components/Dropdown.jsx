import { forwardRef } from "react";

const Dropdown = forwardRef(({ 
  defaultLabel = "Select...", 
  defaultValue = "all",
  valueKey = "id", 
  labelKey = "name", 
  fetchFn, 
  sortFn = (a, b) => a.name.localeCompare(b.name), // sensible default
  ...props 
}, ref) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchFn();
        setOptions([...data.responses].sort(sortFn));
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [fetchFn]);

  return (
    <div>
      <select ref={ref} {...props} className="bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm border-black">
        {placeholder && <option value="all">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt[valueKey]} value={opt[valueKey]}>{opt[labelKey]}</option>
        ))}
      </select>
    </div>
  );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;