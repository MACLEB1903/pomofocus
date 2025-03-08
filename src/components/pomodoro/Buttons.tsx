import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { PomodoroContext } from "../../context/PomodoroContext";
import { TimerContext } from "../../context/TimerContext";

export default function Buttons() {
  const { fillColor, buttonColor, theme } = useContext(ThemeContext)!;
  const { buttonDisplay, session, activeButton, setSession, setActiveButton } =
    useContext(PomodoroContext)!;
  const {
    sessionLength,
    breakLength,
    isPomodoroRunning,
    isBreakRunning,
    setIsPomodoroRunning,
    setIsBreakRunning,
    setPomodoroTimer,
    setBreakTimer,
  } = useContext(TimerContext)!;

  function buttonsActions(id: string) {
    //Run Pomodoro
    if (id === "countdown" && !isPomodoroRunning) {
      console.log("pomodoro started");
      setIsPomodoroRunning(true);
      setSession("pomodoro");
    }

    //Setting Session length
    if (id === "session-label" && !isPomodoroRunning) {
      console.log("seeting session length");
      setActiveButton(id);
    }

    //Setting Break Length
    if (id === "break-label" && !isPomodoroRunning) {
      console.log("seeting break length");
      setActiveButton(id);
    }

    //Pause Pomodoro / Pasue Break
    if (id === "stop-pomodoro-break") {
      setActiveButton("");
      if (isPomodoroRunning && session === "pomodoro") {
        console.log("pomodoro paused");
        setIsPomodoroRunning(false);
        setActiveButton(id);
      }
      if (isBreakRunning && session === "break") {
        console.log("break paused");
        setIsBreakRunning(false);
        setActiveButton(id);
      }
    }

    //Continue Pomodoro / Continue Break
    if (id === "stop-pomodoro-break") {
      if (!isPomodoroRunning && session === "pomodoro") {
        console.log("pomodoro continued");
        setIsPomodoroRunning(true);
      }

      if (!isBreakRunning && session === "break") {
        console.log("break continued");
        setIsBreakRunning(true);
      }
    }

    //Skip Pomodoro / Skip Break
    if (id === "skip-pomodoro-break") {
      if (session === "pomodoro") {
        setIsPomodoroRunning(false);
        setIsBreakRunning(true);
        setSession("break");
        console.log("pomodoro skipped");
        setActiveButton("");
      }

      if (session === "break") {
        setIsPomodoroRunning(true);
        setIsBreakRunning(false);
        setSession("pomodoro");
        console.log("break skipped");
        setActiveButton("");
      }
      setPomodoroTimer((prev) => ({
        ...prev,
        minutes: sessionLength,
        seconds: 0,
      }));

      setBreakTimer((prev) => ({
        ...prev,
        minutes: breakLength,
        seconds: 0,
      }));
    }

    //Reset Pomodoro
    if (id === "reset-pomodoro") {
      setSession("default");
      setIsPomodoroRunning(false);
      setIsBreakRunning(false);
      setActiveButton("session-label");

      setPomodoroTimer((prev) => ({
        ...prev,
        minutes: sessionLength,
        seconds: 0,
      }));

      setBreakTimer((prev) => ({
        ...prev,
        minutes: breakLength,
        seconds: 0,
      }));
    }
  }

  return (
    <div className="buttons-wrapper mt-[3rem] gap-[1rem] flex flex-row flex-wrap justify-center">
      {buttonDisplay.map(([icon, id, text], index) => (
        <button
          style={{
            color: theme === "dark-gradient" ? "#222222" : buttonColor,
            background: activeButton == id ? fillColor : "rgb(113, 113, 123)",
          }}
          id={id}
          className={`text-[2rem] py-[0.5rem] px-[1rem] rounded-[1rem] hover:cursor-pointer  ${
            index ? "md:px-[1rem] md:py-[0.5rem]" : ""
          }`}
          onClick={() => buttonsActions(id)}
        >
          <>
            <span className="hidden md:block">{text}</span>
            <span className="md:hidden">{icon}</span>
          </>
        </button>
      ))}
    </div>
  );
}
