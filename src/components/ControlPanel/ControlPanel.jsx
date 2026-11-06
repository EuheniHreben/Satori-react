import "./ControlPanel.css";

function ControlPanel({
  autoMode,
  setAutoMode,
  activeSeason,
  activeTime,
  onChangeBackground,
}) {
  const getBtnClass = (season, time) => {
    const isActive = activeSeason === season && activeTime === time;

    return `button ${isActive ? "button--active" : "button--secondary"}`;
  };

  return (
    <div className="control-panel">
      <label className="toggle-control">
        <input
          type="checkbox"
          checked={autoMode}
          onChange={(e) => setAutoMode(e.target.checked)}
        />

        <span className="toggle-slider"></span>

        <span className="toggle-text">
          {autoMode ? "Автоматический режим" : "Ручной режим"}
        </span>
      </label>

      <div
        className={`bottom-toolbar ${!autoMode ? "bottom-toolbar--open" : ""}`}
      >
        <button
          type="button"
          onClick={() => onChangeBackground("summer", "day")}
          className={getBtnClass("summer", "day")}
        >
          Летний день
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("summer", "night")}
          className={getBtnClass("summer", "night")}
        >
          Летняя ночь
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("autumn", "day")}
          className={getBtnClass("autumn", "day")}
        >
          Осенний день
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("autumn", "night")}
          className={getBtnClass("autumn", "night")}
        >
          Осенняя ночь
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("winter", "day")}
          className={getBtnClass("winter", "day")}
        >
          Зимний день
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("winter", "night")}
          className={getBtnClass("winter", "night")}
        >
          Зимняя ночь
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("spring", "day")}
          className={getBtnClass("spring", "day")}
        >
          Весенний день
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("spring", "night")}
          className={getBtnClass("spring", "night")}
        >
          Весенняя ночь
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
