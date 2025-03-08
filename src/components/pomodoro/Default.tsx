import { useContext } from "react";

import { TimerContext } from "../../context/TimerContext";
import { ThemeContext } from "../../context/ThemeContext";
import { PomodoroContext } from "../../context/PomodoroContext";

import PlusIcon from "../../icons/Plus";
import MinusIcon from "../../icons/Minus";

export default function Default() {
  const { sessionLength, breakLength, setSessionLength, setBreakLength } =
    useContext(TimerContext)!;
  const { fillColor, buttonColor } = useContext(ThemeContext)!;
  const { activeButton } = useContext(PomodoroContext)!;

  console.log(buttonColor);
  function incrementTimer() {
    if (activeButton === "session-length") {
      setSessionLength((prev) => prev + 1);
    }
    if (activeButton === "break-length") {
      setBreakLength((prev) => prev + 1);
    }
  }

  function decrementTimer() {
    if (activeButton === "session-length") {
      setSessionLength((prev) => Math.max(prev - 1, 1));
    }
    if (activeButton === "break-length") {
      setBreakLength((prev) => Math.max(prev - 1, 1));
    }
  }

  return (
    <>
      <div className="add-subtact-wrapper flex-row items-center hidden md:flex md:gap-[2rem] lg:gap-[3rem] xl:gap-[4rem]">
        <button
          onClick={() => incrementTimer()}
          id={
            activeButton === "break-label"
              ? "break-increment"
              : activeButton === "session-label"
              ? "session-increment"
              : ""
          }
        >
          <PlusIcon />
        </button>

        <h2
          className="time-count text-[clamp(8rem,10vw,15rem)] text-center"
          style={{ color: fillColor }}
        >
          {activeButton === "session-label" && (
            <span>{String(sessionLength).padStart(2, "0")}:00</span>
          )}
          {activeButton === "break-label" && (
            <span>{String(breakLength).padStart(2, "0")}:00</span>
          )}
        </h2>
        <button
          onClick={() => decrementTimer()}
          id={
            activeButton === "break-label"
              ? "break-decrement"
              : activeButton === "session-label"
              ? "session-decrement"
              : ""
          }
        >
          <MinusIcon />
        </button>
      </div>

      <div className="add-subtact-wrapper flex flex-col items-center md:hidden gap-[1rem]">
        <h2
          className="time-count text-[clamp(8rem,10vw,15rem)] text-center"
          style={{ color: fillColor }}
        >
          {activeButton === "session-label" && (
            <span>
              <span>{String(sessionLength).padStart(2, "0")}:00</span>
            </span>
          )}
          {activeButton === "break-label" && (
            <span>
              <span>{String(breakLength).padStart(2, "0")}:00</span>
            </span>
          )}
        </h2>
        <div className="flex flex-row gap-[1rem]">
          <button
            id={
              activeButton === "break-label"
                ? "break-increment"
                : activeButton === "session-label"
                ? "session-increment"
                : ""
            }
            onClick={() => incrementTimer()}
            className="py-[0.5rem] px-[1rem] rounded-[1rem]"
            style={{ background: "rgb(113, 113, 123)" }}
          >
            <PlusIcon />
          </button>
          <button
            onClick={() => decrementTimer()}
            className="py-[0.5rem] px-[1rem] rounded-[1rem]"
            style={{ background: "rgb(113, 113, 123)" }}
            id={
              activeButton === "break-label"
                ? "break-decrement"
                : activeButton === "session-label"
                ? "session-decrement"
                : ""
            }
          >
            <MinusIcon />
          </button>
        </div>
      </div>
    </>
  );
}
