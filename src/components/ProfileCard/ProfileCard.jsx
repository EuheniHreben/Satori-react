import "./ProfileCard.css";
import PomodoroSettings from "../PomodoroSettings/PomodoroSettings.jsx";
import PomodoroTimer from "../PomodoroTimer/PomodoroTimer.jsx";

import { useState } from "react";
import avatar from "../../assets/avatar.jpg";

function ProfileCard({ quote, mode, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleCardClick() {
    if (mode === "splash") {
      onClick();
      return;
    }

    setIsFlipped((prev) => !prev);
  }

  function handleBackClick(event) {
    event.stopPropagation();
    setIsFlipped(false);
  }

  return (
    <article
      className={`card ${mode === "splash" ? "card--splash" : "card--default"}`}
      onClick={handleCardClick}
    >
      <div className={`card-inner ${isFlipped ? "card-inner--flipped" : ""}`}>
        {/* Лицевая сторона */}
        <div className="card-face card-front">
          <div className="avatar">
            <img src={avatar} alt="Аватар" />
          </div>

          {mode === "default" && (
            <div className="quote" key={quote}>
              <p>{quote}</p>
            </div>
          )}
        </div>

        {/* Обратная сторона */}
        <div className="card-face card-back">
          <PomodoroTimer />
          <PomodoroSettings />
          <button
            className="card-back__return"
            type="button"
            onClick={handleBackClick}
          >
            Назад
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProfileCard;
