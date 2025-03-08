import { useEffect, useState, useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

export default function Focus() {
  const { fillColor } = useContext(ThemeContext)!;
  const [time, setTime] = useState({
    hours: String(new Date().getHours()).padStart(2, "0"),
    minutes: String(new Date().getMinutes()).padStart(2, "0"),
  });

  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();

      setTime({
        hours: String(time.getHours()).padStart(2, "0"),
        minutes: String(time.getMinutes()).padStart(2, "0"),
      });

      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2
      className="time-count text-[clamp(8rem,10vw,15rem)] text-center"
      style={{ color: fillColor }}
    >
      {time.hours}
      {showColon ? ":" : " "}
      {time.minutes}
    </h2>
  );
}
