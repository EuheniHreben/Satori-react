import { useEffect, useRef, useState } from "react";
import "./App.css";

const SPIN_DURATION = 15;

const INITIAL_SECTORS = [
  { label: "🎲 Случайность", color: "url(#umbrellaWhite)" },
  { label: "🎨 Созидание", color: "url(#umbrellaRed)" },
  { label: "🚶 Слепой маршрут", color: "url(#umbrellaWhite)" },
  { label: "🗺️ Новая локация", color: "url(#umbrellaRed)" },
  { label: "🤝 Встреча с другом", color: "url(#umbrellaWhite)" },
  { label: "⚫ Чёрная комната", color: "url(#umbrellaRed)" },
  { label: "🎮 Игра", color: "url(#umbrellaWhite)" },
  { label: "🎬 Фильм", color: "url(#umbrellaRed)" },
];

const CENTER = 300;
const OUTER_RADIUS = 285;
const TEXT_RADIUS = 175;

function polarToCartesian(angle, radius) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: CENTER + radius * Math.cos(radians),
    y: CENTER + radius * Math.sin(radians),
  };
}

function WheelSvg({ sectors, onSectorClick, disabled }) {
  const anglePerSector = 360 / sectors.length;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label="Колесо приключений. Нажмите на сектор, чтобы добавить подпункты."
    >
      <defs>
        <linearGradient id="umbrellaRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d0000" />
          <stop offset="25%" stopColor="#8b0000" />
          <stop offset="50%" stopColor="#d01818" />
          <stop offset="75%" stopColor="#7a0000" />
          <stop offset="100%" stopColor="#2b0000" />
        </linearGradient>

        <linearGradient id="umbrellaWhite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5a5a5a" />
          <stop offset="20%" stopColor="#d9d9d9" />
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#bcbcbc" />
          <stop offset="100%" stopColor="#4a4a4a" />
        </linearGradient>
      </defs>

      <polygon
        points="100,100 500,100 500,500 100,500"
        fill="#111"
        stroke="#fff"
        strokeWidth="4"
      />

      {sectors.map((sector, index) => {
        const start = index * anglePerSector;
        const end = (index + 1) * anglePerSector;
        const middle = (start + end) / 2;

        const startPoint = polarToCartesian(start, OUTER_RADIUS);
        const endPoint = polarToCartesian(end, OUTER_RADIUS);
        const centerStart = polarToCartesian(start, 0);
        const centerEnd = polarToCartesian(end, 0);
        const textPoint = polarToCartesian(middle, TEXT_RADIUS);

        const largeArc = end - start > 180 ? 1 : 0;

        const path = [
          `M ${centerStart.x} ${centerStart.y}`,
          `L ${startPoint.x} ${startPoint.y}`,
          `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`,
          `L ${centerEnd.x} ${centerEnd.y}`,
          "Z",
        ].join(" ");

        return (
          <g
            className="slice"
            key={`${sector.label}-${index}`}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Редактировать сектор ${sector.label}`}
            onClick={() => !disabled && onSectorClick(index)}
            onKeyDown={(event) => {
              if (!disabled && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onSectorClick(index);
              }
            }}
            style={{ cursor: disabled ? "default" : "pointer" }}
          >
            <path
              d={path}
              fill={sector.color}
              stroke="#020208"
              strokeWidth="3"
            />
            <text
              x={textPoint.x}
              y={textPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${middle - 90}, ${textPoint.x}, ${textPoint.y})`}
              fill="#fff"
              fontSize="20"
              fontWeight="bold"
            >
              {sector.label}
            </text>
          </g>
        );
      })}

      <circle
        cx={CENTER}
        cy={CENTER}
        r="0"
        fill="#050510"
        stroke="#fff"
        strokeWidth="5"
      />
    </svg>
  );
}

export default function App() {
  const [sectors] = useState(INITIAL_SECTORS);
  const [subitems, setSubitems] = useState(() => INITIAL_SECTORS.map(() => []));

  const [isSpinning, setIsSpinning] = useState(false);
  const [isIdle, setIsIdle] = useState(true);
  const [rotation, setRotation] = useState(0);

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [editingSectorIndex, setEditingSectorIndex] = useState(null);
  const [subitemInput, setSubitemInput] = useState("");
  const [result, setResult] = useState(null);

  const wheelRef = useRef(null);
  const audioRef = useRef(null);
  const spinTimeoutRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const editingSector =
    editingSectorIndex !== null ? sectors[editingSectorIndex] : null;

  useEffect(() => {
    return () => {
      window.clearTimeout(spinTimeoutRef.current);
      window.clearInterval(fadeIntervalRef.current);
    };
  }, []);

  function startAudio() {
    setIsSplashVisible(false);

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 70;
    audio.volume = 0;

    audio
      .play()
      .then(() => {
        window.clearInterval(fadeIntervalRef.current);

        fadeIntervalRef.current = window.setInterval(() => {
          if (audio.volume < 0.5) {
            audio.volume = Math.min(0.5, audio.volume + 0.05);
          } else {
            window.clearInterval(fadeIntervalRef.current);
          }
        }, 200);
      })
      .catch((error) => {
        console.error("Не удалось воспроизвести аудио:", error);
      });
  }

  function openSectorModal(index) {
    if (isSpinning) return;

    setEditingSectorIndex(index);
    setSubitemInput("");
    setIsResultModalOpen(false);
    setIsSectorModalOpen(true);
  }

  function addSubitem() {
    const value = subitemInput.trim();

    if (!value || editingSectorIndex === null) return;

    setSubitems((current) =>
      current.map((items, index) =>
        index === editingSectorIndex ? [...items, value] : items,
      ),
    );

    setSubitemInput("");
  }

  function closeModals() {
    setIsSectorModalOpen(false);
    setIsResultModalOpen(false);
  }

  function spinWheel() {
    if (isSpinning || !wheelRef.current) return;

    setIsSpinning(true);
    setIsIdle(false);

    const wheel = wheelRef.current;
    const computedTransform = window.getComputedStyle(wheel).transform;

    let currentAngle = 0;

    if (computedTransform && computedTransform !== "none") {
      const matrix = new DOMMatrix(computedTransform);
      currentAngle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

      if (currentAngle < 0) currentAngle += 360;
    }

    // Фиксируем фактическое положение колеса после остановки idle-анимации.
    wheel.style.transition = "none";
    wheel.style.transform = `rotate(${currentAngle}deg)`;
    wheel.getBoundingClientRect();

    const anglePerSector = 360 / sectors.length;
    const winningIndex = Math.floor(Math.random() * sectors.length);

    const targetAngle =
      360 - (winningIndex * anglePerSector + anglePerSector / 2);

    const extraTurns = 5 * 360;
    const nextRotation =
      currentAngle +
      extraTurns +
      ((targetAngle - (currentAngle % 360) + 360) % 360);

    setRotation(nextRotation);

    requestAnimationFrame(() => {
      wheel.style.transition = `transform ${SPIN_DURATION}s cubic-bezier(0.05, 0.9, 0.1, 1)`;
      wheel.style.transform = `rotate(${nextRotation}deg)`;
    });

    spinTimeoutRef.current = window.setTimeout(() => {
      const sectorItems = subitems[winningIndex];
      const randomSubitem =
        sectorItems.length > 0
          ? sectorItems[Math.floor(Math.random() * sectorItems.length)]
          : null;

      setResult({
        sector: sectors[winningIndex],
        subitem: randomSubitem,
      });

      setIsSpinning(false);
      setIsResultModalOpen(true);

      wheel.style.transition = "none";
      wheel.style.setProperty("--idle-start", `${nextRotation}deg`);
      wheel.style.transform = `rotate(${nextRotation}deg)`;

      requestAnimationFrame(() => {
        wheel.style.transition = "";
        setIsIdle(true);
      });
    }, SPIN_DURATION * 1000);
  }

  return (
    <main className="app">
      <audio
        ref={audioRef}
        src="/Marilyn Manson - Resident Evil - Theme.mp3"
        loop
        preload="auto"
      />

      {isSplashVisible && (
        <div id="splash-screen">
          <button className="enter-btn" onClick={startAudio}>
            Включить зажигание
          </button>
        </div>
      )}

      <div className="cyber-sun" />
      <div className="grid-3d" />
      <div className="horizon" />

      <h1
        className="glitch-title"
        data-text-red="КОЛЕСО ПРИКЛЮЧЕНИЙ"
        data-text-blue="КОЛЕСО ПРИКЛЮЧЕНИЙ"
      >
        КОЛЕСО ПРИКЛЮЧЕНИЙ
      </h1>

      <section className="roulette-container" aria-label="Колесо приключений">
        <div className="pointer" />

        <div
          ref={wheelRef}
          className={`wheel ${isIdle && !isSpinning ? "idle" : ""}`}
          style={{
            "--idle-start": `${rotation}deg`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <WheelSvg
            sectors={sectors}
            onSectorClick={openSectorModal}
            disabled={isSpinning}
          />
        </div>

        <button className="spin-btn" onClick={spinWheel} disabled={isSpinning}>
          {isSpinning ? "..." : "КРУТИТЬ"}
        </button>
      </section>

      <div
        className={`modal-overlay ${
          isSectorModalOpen || isResultModalOpen ? "is-open" : ""
        }`}
        onClick={() => !isSpinning && closeModals()}
      />

      {isSectorModalOpen && editingSector && (
        <section
          className="modal-window is-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sectorModalTitle"
        >
          <h2 id="sectorModalTitle">Сектор: {editingSector.label}</h2>

          <div className="added-subitems-list">
            {subitems[editingSectorIndex].length === 0 ? (
              <div>Подпунктов пока нет.</div>
            ) : (
              subitems[editingSectorIndex].map((item, index) => (
                <div key={`${item}-${index}`}>• {item}</div>
              ))
            )}
          </div>

          <form
            className="subitem-form"
            onSubmit={(event) => {
              event.preventDefault();
              addSubitem();
            }}
          >
            <div className="subitem-input-wrapper">
              <input
                type="text"
                className="modal-input"
                placeholder="Введите название подпункта..."
                autoComplete="off"
                value={subitemInput}
                onChange={(event) => setSubitemInput(event.target.value)}
              />
              <button type="submit" className="modal-btn">
                Добавить
              </button>
            </div>

            <button
              type="button"
              className="modal-btn pink-btn"
              onClick={closeModals}
            >
              Сохранить и закрыть
            </button>
          </form>
        </section>
      )}

      {isResultModalOpen && result && (
        <section
          className="modal-window result-modal is-open show"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resultModalTitle"
        >
          <h2 id="resultModalTitle">ВАШЕ ПРИКЛЮЧЕНИЕ НА СЕГОДНЯ:</h2>

          <p>{result.sector.label}</p>

          {result.subitem && (
            <div id="resultSubitemsContainer">
              <div
                style={{
                  fontSize: "1.2rem",
                  color: "#ff007f",
                  marginBottom: 5,
                  textTransform: "uppercase",
                }}
              >
                Выпавший подпункт:
              </div>
              <ul className="result-subitems">
                <li>{result.subitem}</li>
              </ul>
            </div>
          )}

          <button className="modal-btn pink-btn" onClick={closeModals}>
            Продолжить
          </button>
        </section>
      )}
    </main>
  );
}
