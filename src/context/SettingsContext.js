import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [timerDuration, setTimerDuration] = useState(20); // 默認 20 分鐘
  const [handlers, setHandlers] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
  ]);

  // 登出計時器相關邏輯
  const [logoutTimer, setLogoutTimer] = useState(null);

  const resetLogoutTimer = (handleLogout) => {
    if (logoutTimer) clearTimeout(logoutTimer);
    setLogoutTimer(
      setTimeout(() => {
        handleLogout();
      }, timerDuration * 60 * 1000) // 轉換為毫秒
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        timerDuration,
        setTimerDuration,
        handlers,
        setHandlers,
        resetLogoutTimer,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
