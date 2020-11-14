// creamos 1 diccionario
import { useEffect, useState } from "react";
import { formatDate } from "./useDateTimeFormat";
const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat;
const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];
const getDateDiffs = (timestamp) => {
  // el tiempo ahora
  const now = Date.now();
  // diferencia entre el tiempo de creacion y ahora dividido por
  // 100 para que quite los ms
  const elapsed = (timestamp - now) / 1000;
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};
export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));
  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp);
        setTimeago(newTimeAgo);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [timestamp]);
  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp);
  }
  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  });
  const { value, unit } = timeago;
  return rtf.format(value, unit);
}
