import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 確保導入了 Tailwind 的樣式文件
import { SettingsProvider } from "./context/SettingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);
