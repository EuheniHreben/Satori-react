import "./PomodoroTimer.css";
import usePomodoroTimer from "../../hooks/usePomodoroTimer.js";
import { useAppSettings } from "../../context/AppSettingsContext.jsx";

function PomodoroTimer() {
  const timer = usePomodoroTimer();
  const { settings } = useAppSettings();

  const phaseLabel = timer.phase === "work" ? "Работа" : "Перерыв";

  const statusLabel = {
    idle: "Готов к работе",
    running: "В процессе",
    paused: "На паузе",
    completed: "Все сессии завершены",
  };

  return (
    <section
      className={`pomodoro-timer pomodoro-timer--${timer.phase}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="pomodoro-timer__info">
        <span className="pomodoro-timer__phase">{phaseLabel}</span>

        <span className="pomodoro-timer__status">
          {statusLabel[timer.status]}
        </span>
      </div>

      <div className="pomodoro-timer__time">{timer.time}</div>

      <div className="pomodoro-timer__cycle">
        Сессия {timer.currentCycle} из {settings.pomodoro.totalCycles}
      </div>

      <div className="pomodoro-timer__controls">
        {(timer.status === "idle" || timer.status === "completed") && (
          <button type="button" onClick={timer.start}>
            {timer.status === "completed" ? "Заново" : "Старт"}
          </button>
        )}

        {timer.status === "running" && (
          <button type="button" onClick={timer.pause}>
            Пауза
          </button>
        )}

        {timer.status === "paused" && (
          <button type="button" onClick={timer.resume}>
            Продолжить
          </button>
        )}

        {(timer.status === "running" || timer.status === "paused") && (
          <>
            <button type="button" onClick={timer.skip}>
              Пропустить
            </button>
            <button type="button" onClick={timer.reset}>
              Сбросить
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default PomodoroTimer;
