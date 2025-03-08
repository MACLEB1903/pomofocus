import { useContext } from "react";

import { TimerContext } from "../../context/TimerContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function BreakTimer() {
  const { fillColor } = useContext(ThemeContext)!;
  const { breakTimer } = useContext(TimerContext)!;
  return (
    <h2
      className="time-count text-[clamp(8rem,10vw,15rem)] text-center"
      style={{ color: fillColor }}
    >
      {String(breakTimer.minutes).padStart(2, "0")}:
      {String(breakTimer.seconds).padStart(2, "0")}
    </h2>
  );
}
