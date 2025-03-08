import { useContext } from "react";

import { PomodoroContext } from "../context/PomodoroContext";

import PomodoroTimer from "../components/pomodoro/PomodoroTimer";
import Default from "./pomodoro/Default";
import BreakTimer from "./pomodoro/BreakTimer";
import Buttons from "./pomodoro/Buttons";

export default function Pomodoro() {
  const { session } = useContext(PomodoroContext)!;

  return (
    <div className="flex flex-col">
      <Buttons />
      {session === "default" && <Default />}
      {session === "pomodoro" && <PomodoroTimer />}
      {session === "break" && <BreakTimer />}
    </div>
  );
}
