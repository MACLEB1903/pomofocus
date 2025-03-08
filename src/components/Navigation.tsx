import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import { Clock } from "../icons/Clock";
import { Rocket } from "../icons/Rocket";
import { Sparkles } from "../icons/Sparkles";
import { ThemeType } from "../context/ThemeContext";

const themes: ThemeType[] = [
  "dark",
  "light",
  "dark-gradient",
  "light-gradient",
];

let count = 0;

export default function Navigation() {
  const { mode, fillColor, navBgColor, setMode, setTheme } =
    useContext(ThemeContext)!;

  return (
    <nav
      className="navigation-wrapper  flex flex-row self-center rounded-full py-[0.5rem] px-[1rem] gap-[0.5rem]"
      style={{ background: navBgColor }}
    >
      <button
        className="br-50% rounded-full hover:cursor-pointer"
        style={{
          background: mode === "focus" ? fillColor : "",
        }}
        onClick={() => setMode("focus")}
      >
        <Rocket />
      </button>
      <button
        className=" br-50% rounded-full hover:cursor-pointer"
        onClick={() => setMode("pomodoro")}
        style={{
          background: mode === "pomodoro" ? fillColor : "",
        }}
      >
        <Clock />
      </button>
      <button
        className=" br-50% rounded-full hover:cursor-pointer"
        onClick={() => {
          count++;
          setTheme(themes[count % themes.length]);
        }}
      >
        <Sparkles />
      </button>
    </nav>
  );
}
