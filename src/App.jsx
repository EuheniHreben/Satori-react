import "./App.css";
import { useState, useEffect } from "react";
import Background from "./components/Background/Background.jsx";
import ProfileCard from "./components/ProfileCard/ProfileCard.jsx";
import ControlPanel from "./components/ControlPanel/ControlPanel.jsx";

import quotes from "./data/quote";
import getRealTimeConfig from "./utils/getRealTimeConfig.js";

function App() {
  const [quote, setQuote] = useState(quotes[0]);
  const [initialConfig] = useState(getRealTimeConfig);
  const [activeSeason, setActiveSeason] = useState(initialConfig.season);
  const [activeTime, setActiveTime] = useState(initialConfig.time);
  const [autoMode, setAutoMode] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  function changeBackground(season, time) {
    setActiveSeason(season);
    setActiveTime(time);
  }

  function handleStart() {
    setIsStarted(true);
  }

  useEffect(() => {
    if (!autoMode) return;

    function updateRealTimeConfig() {
      const { season, time } = getRealTimeConfig();

      setActiveSeason(season);
      setActiveTime(time);
    }

    updateRealTimeConfig();

    const intervalId = setInterval(updateRealTimeConfig, 60000);

    return () => clearInterval(intervalId);
  }, [autoMode]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main
      className={`page-wrapper ${!isStarted ? "page-wrapper--splash" : ""}`}
    >
      <Background activeSeason={activeSeason} activeTime={activeTime} />
      <ProfileCard
        quote={quote}
        mode={isStarted ? "default" : "splash"}
        onClick={handleStart}
      />
      <ControlPanel
        autoMode={autoMode}
        setAutoMode={setAutoMode}
        activeSeason={activeSeason}
        activeTime={activeTime}
        onChangeBackground={changeBackground}
      />
    </main>
  );
}

export default App;
