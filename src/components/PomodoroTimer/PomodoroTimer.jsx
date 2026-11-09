import "./PomodoroTimer.css";
import usePomodoroTimer from "../../hooks/usePomodoroTimer.js";
import { useAppSettings } from "../../context/AppSettingsContext.jsx";
import { IoPlay, IoPause, IoPlaySkipForward, IoRefresh } from "react-icons/io5";

function PomodoroTimer() {
  const timer = usePomodoroTimer();
  const { settings } = useAppSettings();

  const phaseLabel =
    timer.status === "idle"
      ? "Ожидание"
      : timer.phase === "work"
        ? "Работа"
        : "Перерыв";

  return (
    <section
      className={`pomodoro-timer pomodoro-timer--${timer.phase}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="pomodoro-timer__info">
        <span className="pomodoro-timer__phase">{phaseLabel}</span>
      </div>

      <div className="pomodoro-timer__time">{timer.time}</div>

      <div className="pomodoro-timer__cycle">
        Сессия {timer.currentCycle} из {settings.pomodoro.totalCycles}
      </div>

      <div className="pomodoro-timer__controls">
        {/* 1. Если таймер не запущен или завершен — показываем стартовую текстовую кнопку */}
        {(timer.status === "idle" || timer.status === "completed") && (
          <button
            type="button"
            className="pomodoro-timer__btn-icon"
            onClick={timer.start}
          >
            {timer.status === "completed" ? "Заново" : "Старт"}
          </button>
        )}

        {/* 2. Если таймер АКТИВЕН (работает или на паузе) — включаем блок круглых иконок */}
        {(timer.status === "running" || timer.status === "paused") && (
          <div className="pomodoro-timer__icon-group">
            {/* Единая кнопка Пауза / Продолжить */}
            <button
              type="button"
              className="pomodoro-timer__btn-icon"
              onClick={timer.status === "running" ? timer.pause : timer.resume}
            >
              {timer.status === "running" ? (
                <IoPause size={20} />
              ) : (
                <IoPlay size={20} />
              )}
            </button>

            {/* Кнопка Пропустить */}
            <button
              type="button"
              className="pomodoro-timer__btn-icon"
              onClick={timer.skip}
            >
              <IoPlaySkipForward size={20} />
            </button>

            {/* Кнопка Сбросить */}
            <button
              type="button"
              className="pomodoro-timer__btn-icon"
              onClick={timer.reset}
            >
              <IoRefresh size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PomodoroTimer;
