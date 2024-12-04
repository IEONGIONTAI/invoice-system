import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddReceipt from "./components/AddReceipt";
import ManageReceipts from "./components/ManageReceipts";
import PrintReceipt from "./components/PrintReceipt";
import Login from "./components/Logon";
import Setting from "./components/Settings";
import { SettingsContext } from "./context/SettingsContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { timerDuration } = useContext(SettingsContext);
  const logoutTimeout = timerDuration * 60 * 1000;

  // 檢查登入狀態
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    if (savedLoginStatus === "true") {
      setIsLoggedIn(true);
      const resetTimerOnUserActivity = () => resetLogoutTimer();
      window.addEventListener("click", resetTimerOnUserActivity);
      window.addEventListener("keydown", resetTimerOnUserActivity);
      return () => {
        window.removeEventListener("click", resetTimerOnUserActivity);
        window.removeEventListener("keydown", resetTimerOnUserActivity);
      };
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 登出處理
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // 清除登入狀態
    alert("已登出！");
    window.location.href = "/login"; // 跳轉到登入頁面
  };

  // 設置登出計時器
  const resetLogoutTimer = () => {
    if (window.logoutTimer) clearTimeout(window.logoutTimer); // 清除舊計時器
    window.logoutTimer = setTimeout(() => {
      handleLogout(); // 自動登出
    }, logoutTimeout);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">有限公司系統</h1>
            <div className="space-x-4">
              {isLoggedIn && (
                <>
                  <Link to="/" className="hover:underline">
                    首頁
                  </Link>
                  <Link to="/add-receipt" className="hover:underline">
                    新增收據
                  </Link>
                  <Link to="/manage-receipts" className="hover:underline">
                    收據管理
                  </Link>
                  <Link to="/setting" className="hover:underline">
                    設定
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-6">
          <Routes>
            {/* 登入頁面 */}
            <Route path="/login" element={<Login />} />

            {/* 需要登入的頁面 */}
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-receipt" element={<AddReceipt />} />
                <Route path="/manage-receipts" element={<ManageReceipts />} />
                <Route path="/print-receipt" element={<PrintReceipt />} />
                <Route path="/setting" element={<Setting />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
