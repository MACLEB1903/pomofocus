import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

export default function Minus() {
  const { fillColor } = useContext(ThemeContext)!;
  return (
    <svg
      className="w-[3rem] h-[3rem] md:h-[5rem] md:w-[5rem] lg:w-[6rem] lg:h-[6rem] xl:w-[7rem] xl:h-[7rem]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={fillColor}
    >
      <path d="M200-440v-80h560v80H200Z" />
    </svg>
  );
}
