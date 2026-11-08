import "./PomodoroSettings.css";
import { useAppSettings } from "../../context/AppSettingsContext.jsx";

function PomodoroSettings() {
  const { settings, updateSettings } = useAppSettings();
  const { workDuration, breakDuration, totalCycles } = settings.pomodoro;

  function handleChange(name, value) {
    if (value === "") return;

    updateSettings("pomodoro", {
      [name]: Number(value),
    });
  }

  return (
    <section
      className="pomodoro-settings"
      onClick={(event) => event.stopPropagation()}
    >
      <label className="pomodoro-settings__field">
        <span>Работа (мин.)</span>
        <input
          type="number"
          min="1"
          max="180"
          value={workDuration}
          onChange={(event) => handleChange("workDuration", event.target.value)}
        />
      </label>

      <label className="pomodoro-settings__field">
        <span>Перерыв (мин.)</span>
        <input
          type="number"
          min="1"
          max="60"
          value={breakDuration}
          onChange={(event) =>
            handleChange("breakDuration", event.target.value)
          }
        />
      </label>

      <label className="pomodoro-settings__field">
        <span>Рабочих сессий</span>
        <input
          type="number"
          min="1"
          max="12"
          value={totalCycles}
          onChange={(event) => handleChange("totalCycles", event.target.value)}
        />
      </label>
    </section>
  );
}

export default PomodoroSettings;
