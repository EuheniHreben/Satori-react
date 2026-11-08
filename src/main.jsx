import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { AppSettingsProvider } from "./context/AppSettingsContext.jsx";

import "./styles/normalize.css";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppSettingsProvider>
      <App />
    </AppSettingsProvider>
  </StrictMode>,
);
