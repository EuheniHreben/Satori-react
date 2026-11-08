import { createContext, useContext, useEffect, useState } from "react";

import { loadAppSettings, saveAppSettings } from "../store/appSettings.js";

const AppSettingsContext = createContext(null);

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadAppSettings);

  useEffect(() => {
    saveAppSettings(settings);
  }, [settings]);

  function updateSettings(section, updates) {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
  }

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error(
      "useAppSettings должен использоваться внутри AppSettingsProvider",
    );
  }

  return context;
}
