import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

import { PomodoroContext } from "./PomodoroContext";
type TimerContextType = {
  sessionLength: number;
  breakLength: number;
  pomodoroTimer: {
    minutes: number;
    seconds: number;
  };
  breakTimer: {
    minutes: number;
    seconds: number;
  };
  isPomodoroRunning: boolean;
  isBreakRunning: boolean;
  setIsPomodoroRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBreakRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setPomodoroTimer: React.Dispatch<
    React.SetStateAction<{
      minutes: number;
      seconds: number;
    }>
  >;
  setBreakTimer: React.Dispatch<
    React.SetStateAction<{
      minutes: number;
      seconds: number;
    }>
  >;
  setSessionLength: React.Dispatch<React.SetStateAction<number>>;
  setBreakLength: React.Dispatch<React.SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType | undefined>(
  undefined
);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const { setSession } = useContext(PomodoroContext)!;

  const [sessionLength, setSessionLength] = useState<number>(25);
  const [breakLength, setBreakLength] = useState<number>(5);

  const [pomodoroTimer, setPomodoroTimer] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: sessionLength, seconds: 0 });
  const [breakTimer, setBreakTimer] = useState<{
    minutes: number;
    seconds: number;
  }>({ minutes: breakLength, seconds: 0 });

  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [isBreakRunning, setIsBreakRunning] = useState(false);

  useEffect(() => {
    if (isPomodoroRunning) {
      document.title = `Pomodoro: ${String(pomodoroTimer.minutes).padStart(
        2,
        "0"
      )}:${String(pomodoroTimer.seconds).padStart(2, "0")}`;
    }

    if (isBreakRunning) {
      document.title = `Break: ${String(breakTimer.minutes).padStart(
        2,
        "0"
      )}:${String(breakTimer.seconds).padStart(2, "0")}`;
    }

    if (!isBreakRunning && !isPomodoroRunning) {
      document.title = "pomofocus by MARCEL";
    }

    let interval: NodeJS.Timeout | null = null;

    const updateTimer = (
      setTimer: React.Dispatch<
        React.SetStateAction<{ minutes: number; seconds: number }>
      >
    ) => {
      return setInterval(() => {
        setTimer((prev) => {
          if (prev.minutes === 0 && prev.seconds === 0) {
            return prev;
          }
          const totalSeconds = prev.minutes * 60 + prev.seconds - 1;
          return {
            minutes: Math.floor(totalSeconds / 60),
            seconds: totalSeconds % 60,
          };
        });
      }, 1000);
    };

    if (isPomodoroRunning) {
      interval = updateTimer(setPomodoroTimer);
    } else if (isBreakRunning) {
      interval = updateTimer(setBreakTimer);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isPomodoroRunning,
    isBreakRunning,
    setPomodoroTimer,
    setBreakTimer,
    pomodoroTimer.minutes,
    pomodoroTimer.seconds,
    breakTimer.minutes,
    breakTimer.seconds,
  ]);

  useEffect(() => {
    if (
      pomodoroTimer.minutes === 0 &&
      pomodoroTimer.seconds === 0 &&
      isPomodoroRunning
    ) {
      setIsPomodoroRunning(false);
      setIsBreakRunning(true);
      setSession("break");
      setBreakTimer({ minutes: breakLength, seconds: 0 });
    }

    if (
      breakTimer.minutes === 0 &&
      breakTimer.seconds === 0 &&
      isBreakRunning
    ) {
      setIsBreakRunning(false);
      setIsPomodoroRunning(true);
      setSession("pomodoro");
      setPomodoroTimer({ minutes: sessionLength, seconds: 0 });
    }
  }, [
    pomodoroTimer.minutes,
    pomodoroTimer.seconds,
    breakTimer.minutes,
    breakTimer.seconds,
    isPomodoroRunning,
    isBreakRunning,
    setSession,
    setIsPomodoroRunning,
    setIsBreakRunning,
    setPomodoroTimer,
    setBreakTimer,
    sessionLength,
    breakLength,
  ]);

  useEffect(() => {
    if (!isPomodoroRunning && !isBreakRunning) {
      setPomodoroTimer({ minutes: sessionLength, seconds: 0 });
      setBreakTimer({ minutes: breakLength, seconds: 0 });
    }
  }, [sessionLength, breakLength, isBreakRunning, isPomodoroRunning]);

  return (
    <TimerContext.Provider
      value={{
        pomodoroTimer,
        setPomodoroTimer,
        breakTimer,
        setBreakTimer,
        isPomodoroRunning,
        setIsPomodoroRunning,
        isBreakRunning,
        setIsBreakRunning,
        sessionLength,
        setSessionLength,
        breakLength,
        setBreakLength,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
