import { useEffect, useState } from "react";
import { useAppSettings } from "../context/AppSettingsContext.jsx";

import {
  createInitialTimerState,
  minutesToMs,
  startTimer,
  pauseTimer,
  resumeTimer,
  skipPhase,
  tickTimer,
  resetTimer,
  getTimerProgress,
  formatTime,
} from "../utils/pomodoroEngine.js";

function usePomodoroTimer() {
  const { settings } = useAppSettings();
  const pomodoroSettings = settings.pomodoro;

  const [timer, setTimer] = useState(createInitialTimerState);

  function start() {
    const now = Date.now();

    setTimer((prev) => {
      const state =
        prev.status === "completed" ? createInitialTimerState() : prev;

      return startTimer(state, pomodoroSettings, now);
    });
  }

  function pause() {
    const now = Date.now();

    setTimer((prev) => pauseTimer(prev, now));
  }

  function resume() {
    const now = Date.now();

    setTimer((prev) => resumeTimer(prev, now));
  }

  function skip() {
    const now = Date.now();

    setTimer((prev) => skipPhase(prev, pomodoroSettings, now));
  }

  function reset() {
    setTimer(resetTimer());
  }

  useEffect(() => {
    if (timer.status !== "running") return;

    const intervalId = setInterval(() => {
      const now = Date.now();

      setTimer((prev) => tickTimer(prev, pomodoroSettings, now));
    }, 200);

    return () => clearInterval(intervalId);
  }, [timer.status, pomodoroSettings]);

  const progress = getTimerProgress(timer);

  const initialDuration = minutesToMs(
    timer.phase === "work"
      ? pomodoroSettings.workDuration
      : pomodoroSettings.breakDuration,
  );

  const time = formatTime(
    timer.status === "idle" ? initialDuration : timer.remainingMs,
  );

  return {
    ...timer,
    time,
    progress,
    start,
    pause,
    resume,
    skip,
    reset,
  };
}

export default usePomodoroTimer;
