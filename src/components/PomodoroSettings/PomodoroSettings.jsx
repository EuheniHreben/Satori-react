import "./PomodoroSettings.css";
import { useAppSettings } from "../../context/AppSettingsContext.jsx";
// Можно использовать аккуратные иконки плюс/минус, либо обычный текст "+" и "-"
import { IoAdd, IoRemove } from "react-icons/io5";

function PomodoroSettings() {
  const { settings, updateSettings } = useAppSettings();
  const { workDuration, breakDuration, totalCycles } = settings.pomodoro;

  // Конфиг ограничений, чтобы логика знала лимиты каждого поля
  const LIMITS = {
    workDuration: { min: 1, max: 180 },
    breakDuration: { min: 1, max: 60 },
    totalCycles: { min: 1, max: 12 },
  };

  function handleChange(name, value) {
    if (value === "") return;

    let numValue = Number(value);
    const { min, max } = LIMITS[name];

    // Защита: держим значение строго в валидном диапазоне
    if (numValue < min) numValue = min;
    if (numValue > max) numValue = max;

    updateSettings("pomodoro", {
      [name]: numValue,
    });
  }

  // Вспомогательная функция для шага кнопок + и -
  const handleStep = (name, currentValue, step) => {
    handleChange(name, currentValue + step);
  };

  return (
    <section
      className="pomodoro-settings"
      onClick={(event) => event.stopPropagation()}
    >
      {/* ПOЛЕ: РАБОТА */}
      <div className="pomodoro-settings__field">
        <span className="pomodoro-settings__label">Работа (мин.)</span>

        <div className="pomodoro-settings__counter">
          <button
            type="button"
            className="pomodoro-settings__btn"
            onClick={() => handleStep("workDuration", workDuration, -1)}
          >
            <IoRemove size={16} />
          </button>

          <input
            type="number"
            className="pomodoro-settings__input"
            value={workDuration}
            onChange={(event) =>
              handleChange("workDuration", event.target.value)
            }
          />

          <button
            type="button"
            className="pomodoro-settings__btn"
            onClick={() => handleStep("workDuration", workDuration, 1)}
          >
            <IoAdd size={16} />
          </button>
        </div>
      </div>

      {/* ПОЛЕ: ПЕРЕРЫВ */}
      <div className="pomodoro-settings__field">
        <span className="pomodoro-settings__label">Перерыв (мин.)</span>

        <div className="pomodoro-settings__counter">
          <button
            type="button"
            className="pomodoro-settings__btn"
            onClick={() => handleStep("breakDuration", breakDuration, -1)}
          >
            <IoRemove size={16} />
          </button>

          <input
            type="number"
            className="pomodoro-settings__input"
            value={breakDuration}
            onChange={(event) =>
              handleChange("breakDuration", event.target.value)
            }
          />

          <button
            type="button"
            className="pomodoro-settings__btn"
            onClick={() => handleStep("breakDuration", breakDuration, 1)}
          >
            <IoAdd size={16} />
          </button>
        </div>
      </div>

      {/* ПОЛЕ: СЕССИИ */}
      <div className="pomodoro-settings__field">
        <span className="pomodoro-settings__label">Рабочих сессий</span>

        <div className="pomodoro-settings__counter">
          <button
            type="button"
            className="pomodoro-settings__btn"
            onClick={() => handleStep("totalCycles", totalCycles, -1)}
          >
            <IoRemove size={16} />
          </button>

          <input
            type="number"
            className="pomodoro-settings__input"
            value={totalCycles}
            onChange={(event) =>
              handleChange("totalCycles", event.target.value)
            }
          />

          <button
            type="button"
            className="pomodoro-settings__btn"
            onClick={() => handleStep("totalCycles", totalCycles, 1)}
          >
            <IoAdd size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PomodoroSettings;
