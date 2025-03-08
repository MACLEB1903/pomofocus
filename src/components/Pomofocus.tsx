import { useEffect, useRef, useState, useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { TimerContext } from "../context/TimerContext";

import Focus from "./Focus";
import Pomodoro from "./Pomodoro";
import Navigation from "./Navigation";

export default function Pomofocus() {
  const { theme, mode } = useContext(ThemeContext)!;
  const { isBreakRunning, isPomodoroRunning } = useContext(TimerContext)!;

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [task, setTask] = useState<string | undefined>(undefined);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isTyping && textRef.current) {
      textRef.current.focus();
    }
  }, [isTyping]);

  return (
    <section
      className={`flex flex-col p-[3rem] h-[100svh] w-[100vw] ${theme} transition-opacity ease-in duration-700 opacity-100`}
    >
      <div className="time-wrapper flex-1 flex flex-col justify-center items-center mb-[10svh] lg:mb-[0]">
        {!isTyping && (
          <button
            className="text-[clamp(3.5rem,5vw,6rem)] task text-center text-zinc-500 hover:cursor-pointer"
            onClick={() => {
              setIsTyping((prev) => !prev);
              if (textRef.current) {
                textRef.current.focus();
              }
            }}
            disabled={isBreakRunning || isPomodoroRunning}
          >
            {isBreakRunning
              ? "Time for a break!"
              : task || "What do you want to focus?"}
          </button>
        )}
        {isTyping && (
          <textarea
            ref={textRef}
            onBlur={() => setIsTyping((prev) => !prev)}
            onChange={() => {
              setTask(textRef.current?.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsTyping((prev) => !prev);
              }
            }}
            className="task text-[clamp(3.5rem,5vw,6rem)] text-center outline-none resize-none h-[1lh] md:h-[1lh] text-zinc-500 truncate"
          />
        )}
        {mode === "focus" && <Focus />}
        {mode === "pomodoro" && <Pomodoro />}
      </div>
      <Navigation />
    </section>
  );
}
