"use client";

import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { TimerContext } from "../context/TimerContext";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

interface ClockProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const clockHandVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "50%",
    originY: "50%",
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const Clock = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  ...props
}: ClockProps) => {
  const controls = useAnimation();
  const { fillColor, mode, buttonColor } = useContext(ThemeContext)!;
  const { isPomodoroRunning, isBreakRunning } = useContext(TimerContext)!;
  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={mode === "pomodoro" ? buttonColor : fillColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <motion.polyline
          points="12 6 12 12 8 14"
          variants={clockHandVariants}
          animate={isPomodoroRunning || isBreakRunning ? "animate" : "normal"}
          initial="normal"
        />
      </svg>
    </div>
  );
};

export { Clock };
