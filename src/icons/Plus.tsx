import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

export default function Plus() {
  const { fillColor } = useContext(ThemeContext)!;
  return (
    <svg
      className="w-[3rem] h-[3rem] md:h-[5rem] md:w-[5rem] lg:w-[6rem] lg:h-[6rem] xl:w-[7rem] xl:h-[7rem]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={fillColor}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}
