import React, { createContext, useState, ReactNode } from "react";

import PlayIcon from "../icons/Play";
import SessionLengthIcon from "../icons/SessionLength";
import BreakLengthIcon from "../icons/BreakLength";
import SkipIcon from "../icons/Skip";
import ResetIcon from "../icons/Reset";
import PauseIcon from "../icons/Pause";

type SessionType = "default" | "pomodoro" | "break";

type PomodoroType = {
  session: SessionType;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  buttonDisplay: any[];
  activeButton: string;
  setSession: React.Dispatch<React.SetStateAction<SessionType>>;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
};

const buttonsThemes = {
  default: [
    [<PlayIcon />, "countdown", <PlayIcon />],
    [<SessionLengthIcon />, "session-label", "Session Length"],
    [<BreakLengthIcon />, "break-label", "Break Length"],
  ],
  pomodoro: [
    [<PauseIcon />, "stop-pomodoro-break", <PauseIcon />],
    [<SkipIcon />, "skip-pomodoro-break", "Skip Pomodoro"],
    [<ResetIcon />, "reset-pomodoro", "Reset Pomodoro"],
  ],
  break: [
    [<PauseIcon />, "stop-pomodoro-break", <PauseIcon />],
    [<SkipIcon />, "skip-pomodoro-break", "Skip Break"],
    [<ResetIcon />, "reset-pomodoro", "Reset Pomodoro"],
  ],
};

export const PomodoroContext = createContext<PomodoroType | undefined>(
  undefined
);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionType>("default");

  const [activeButton, setActiveButton] = useState<string>("session-label");

  const buttonDisplay = buttonsThemes[session];

  return (
    <PomodoroContext.Provider
      value={{
        session,
        setSession,
        buttonDisplay,
        activeButton,
        setActiveButton,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
