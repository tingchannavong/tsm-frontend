export const formatMsToTime = (ms) => {
    if (ms <= 0) return "";

    // 1. Calculate units
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);

    // 2. Helper to add leading zeros (e.g., "05" instead of "5")
    const pad = (num) => String(num).padStart(2, "0");

    // 3. Conditional Return
    if (d > 0) {
      return `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    }

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

export function convertToDateString(myDate) {
   // my date accept input  "YYYY-MM-DDTHH:mm:ss"
  // example "2026-04-01T10:15:03"
  const dateObj = myDate ? new Date(myDate) : new Date();

  if (isNaN(dateObj)) {
    throw new Error("Invalid date passed to convertToDateString");
  }

  const pad = (n) => String(n).padStart(2, "0");

  const yyyy = dateObj.getFullYear();
  const mm = pad(dateObj.getMonth() + 1);
  const dd = pad(dateObj.getDate());
  const hh = pad(dateObj.getHours());
  const min = pad(dateObj.getMinutes());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

export function getElapsedTime(pastDate) {
  const start = new Date(pastDate);
  const now = new Date();

  const diffInMins = now - start;

  const seconds = Math.floor(diffInMins / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  // const days = Math.floor(hours / 24);

  return {
    // days: days,
    hours: hours, //% 24
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

export function convertDateTimeToDate(dateTime, formatDate) {
  // output 14/06/12
  const dateFormat = formatDate || "en-GB";

  const dateObj = new Date(dateTime);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedTime = dateObj.toLocaleString(dateFormat, options);

  return formattedTime;
}

export function convertDateTimeTo24HrTime(dateTime) {
  const dateObj = new Date(dateTime);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const formattedTime = dateObj.toLocaleString(undefined, options);

  return formattedTime;
}

export function convertMinToHour(minutes) {
  const hours = minutes / 60;
  return hours.toFixed(2);
}
