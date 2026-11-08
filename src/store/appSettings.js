const STORAGE_KEY = "satori-settings";

export const defaultSettings = {
  version: 1,

  background: {
    autoMode: true,
    season: "summer",
    time: "day",
  },

  pomodoro: {
    workDuration: 25,
    breakDuration: 5,
    totalCycles: 4,
  },

  appearance: {
    theme: "dark",
  },

  sound: {
    enabled: true,
    volume: 0.5,
  },
};

// Получение настроек
export function loadAppSettings() {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEY);

    if (!savedSettings) {
      return defaultSettings;
    }

    const parsedSettings = JSON.parse(savedSettings);

    return {
      ...defaultSettings,
      ...parsedSettings,

      background: {
        ...defaultSettings.background,
        ...parsedSettings.background,
      },

      pomodoro: {
        ...defaultSettings.pomodoro,
        ...parsedSettings.pomodoro,
      },

      appearance: {
        ...defaultSettings.appearance,
        ...parsedSettings.appearance,
      },

      sound: {
        ...defaultSettings.sound,
        ...parsedSettings.sound,
      },
    };
  } catch (error) {
    console.error("Не удалось загрузить настройки:", error);
    return defaultSettings;
  }
}

// Сохранение настроек
export function saveAppSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Не удалось сохранить настройки:", error);
  }
}
