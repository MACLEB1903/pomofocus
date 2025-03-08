import React, { createContext, useState, ReactNode } from "react";

export type ThemeType = "dark" | "light" | "dark-gradient" | "light-gradient";
type ModeType = "focus" | "pomodoro";

type ThemeContextType = {
  theme: ThemeType;
  mode: ModeType;
  fillColor: string;
  buttonColor: string;
  navBgColor: string;

  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

const themePresets: Record<
  ThemeType,
  { fillColor: string; buttonColor: string; navBgColor: string }
> = {
  dark: {
    fillColor: "#f0eee7",
    buttonColor: "#131313",
    navBgColor: "#55555c",
  },
  light: {
    fillColor: "#222222",
    buttonColor: "#f0eee7",
    navBgColor: "#ABABAB",
  },
  "dark-gradient": {
    fillColor: "#f0eee7",
    buttonColor: "#131313",
    navBgColor: "#55555c",
  },
  "light-gradient": {
    fillColor: "#222222",
    buttonColor: "#f0eee7",
    navBgColor: "#71717b",
  },
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [mode, setMode] = useState<ModeType>("focus");

  const fillColor = themePresets[theme].fillColor;
  const buttonColor = themePresets[theme].buttonColor;
  const navBgColor = themePresets[theme].navBgColor;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        mode,
        setMode,
        fillColor,
        buttonColor,
        navBgColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
