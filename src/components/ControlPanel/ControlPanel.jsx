import "./ControlPanel.css";
import {
  IoSunny,
  IoMoon,
  IoLeaf,
  IoFlame,
  IoSnow,
  IoSunnyOutline,
} from "react-icons/io5";

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
        {/* ЛЕТО */}
        <button
          type="button"
          onClick={() => onChangeBackground("summer", "day")}
          className={getBtnClass("summer", "day")}
        >
          <div className="theme-btn__icons">
            <IoSunny size={20} />
            <IoSunnyOutline size={14} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("summer", "night")}
          className={getBtnClass("summer", "night")}
        >
          <div className="theme-btn__icons">
            <IoSunny size={20} />
            <IoMoon size={14} />
          </div>
        </button>

        {/* ОСЕНЬ */}
        <button
          type="button"
          onClick={() => onChangeBackground("autumn", "day")}
          className={getBtnClass("autumn", "day")}
        >
          <div className="theme-btn__icons">
            <IoFlame size={20} />
            <IoSunnyOutline size={14} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("autumn", "night")}
          className={getBtnClass("autumn", "night")}
        >
          <div className="theme-btn__icons">
            <IoFlame size={20} />
            <IoMoon size={14} />
          </div>
        </button>

        {/* ЗИМА */}
        <button
          type="button"
          onClick={() => onChangeBackground("winter", "day")}
          className={getBtnClass("winter", "day")}
        >
          <div className="theme-btn__icons">
            <IoSnow size={20} />
            <IoSunnyOutline size={14} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("winter", "night")}
          className={getBtnClass("winter", "night")}
        >
          <div className="theme-btn__icons">
            <IoSnow size={20} />
            <IoMoon size={14} />
          </div>
        </button>

        {/* ВЕСНА */}
        <button
          type="button"
          onClick={() => onChangeBackground("spring", "day")}
          className={getBtnClass("spring", "day")}
        >
          <div className="theme-btn__icons">
            <IoLeaf size={20} />
            <IoSunnyOutline size={14} />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChangeBackground("spring", "night")}
          className={getBtnClass("spring", "night")}
        >
          <div className="theme-btn__icons">
            <IoLeaf size={20} />
            <IoMoon size={14} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
