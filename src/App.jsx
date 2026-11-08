import "./App.css";
import { useState, useEffect } from "react";

import Background from "./components/Background/Background.jsx";
import ProfileCard from "./components/ProfileCard/ProfileCard.jsx";
import ControlPanel from "./components/ControlPanel/ControlPanel.jsx";
import AmbientSound from "./components/AmbientSound/AmbientSound.jsx";

import { useAppSettings } from "./context/AppSettingsContext.jsx";

import quotes from "./data/quote";
import getRealTimeConfig from "./utils/getRealTimeConfig.js";
import findActiveBackground from "./utils/findActiveBackground";
import preloadImage from "./utils/preloadImage.js";

function App() {
  const { settings, updateSettings } = useAppSettings();

  const [quote, setQuote] = useState(quotes[0]);
  const [isStarted, setIsStarted] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  // Получаем настройки фона из общего хранилища
  const {
    autoMode,
    season: activeSeason,
    time: activeTime,
  } = settings.background;

  function changeBackground(season, time) {
    updateSettings("background", {
      season,
      time,
    });
  }

  function handleStart() {
    if (!imagesReady) return;
    setIsStarted(true);
  }

  // Автоматическая смена фона
  useEffect(() => {
    if (!autoMode) return;

    function updateRealTimeConfig() {
      const { season, time } = getRealTimeConfig();

      updateSettings("background", {
        season,
        time,
      });
    }

    updateRealTimeConfig();

    const intervalId = setInterval(updateRealTimeConfig, 60000);

    return () => clearInterval(intervalId);
  }, [autoMode]);

  // Смена цитат
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Загрузка активного фона
  useEffect(() => {
    let cancelled = false;

    async function loadBackground() {
      const activeBackground = findActiveBackground({
        activeSeason,
        activeTime,
      });

      if (!activeBackground) {
        console.error("Активный фон не найден");
        return;
      }

      setImagesReady(false);

      try {
        await preloadImage(activeBackground.image);

        if (!cancelled) {
          setImagesReady(true);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    }

    loadBackground();

    return () => {
      cancelled = true;
    };
  }, [activeSeason, activeTime]);

  return (
    <main
      className={`page-wrapper ${!isStarted ? "page-wrapper--splash" : ""}`}
    >
      <Background
        activeSeason={activeSeason}
        activeTime={activeTime}
        isStarted={isStarted}
      />

      <ProfileCard
        quote={quote}
        mode={isStarted ? "default" : "splash"}
        onClick={handleStart}
      />

      <ControlPanel
        autoMode={autoMode}
        setAutoMode={(value) =>
          updateSettings("background", { autoMode: value })
        }
        activeSeason={activeSeason}
        activeTime={activeTime}
        onChangeBackground={changeBackground}
      />

      <AmbientSound
        isStarted={isStarted}
        activeSeason={activeSeason}
        activeTime={activeTime}
      />
    </main>
  );
}

export default App;
