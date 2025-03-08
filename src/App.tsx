import { ThemeProvider } from "./context/ThemeContext";
import { PomodoroProvider } from "./context/PomodoroContext";
import { TimerProvider } from "./context/TimerContext";

import Pomofocus from "./components/Pomofocus";

function App() {
  return (
    <ThemeProvider>
      <PomodoroProvider>
        <TimerProvider>
          <Pomofocus />
        </TimerProvider>
      </PomodoroProvider>
    </ThemeProvider>
  );
}

export default App;
