import styles from "../styles/Base.module.css";
import { forwardRef, useEffect, useState } from "react";
import { useT } from "../languages/translations.js";

const Dropdown = forwardRef(({ 
  placeholder,
  defaultLabel = "Select...", 
  defaultValue = "all",
  valueKey = "id", 
  labelKey = "name", 
  fetchFn, 
  sortFn = (a, b) => a.name.localeCompare(b.name), // sensible default
  ...props 
}, ref) => {
     const t = useT();
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
      <select ref={ref} {...props} className={styles.dropDown}>
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