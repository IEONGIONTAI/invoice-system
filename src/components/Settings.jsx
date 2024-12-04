import React, { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";

const Settings = () => {
  const { timerDuration, setTimerDuration, handlers, setHandlers } =
    useContext(SettingsContext);
  const [newHandler, setNewHandler] = useState("");
  const [inputValue, setInputValue] = useState(timerDuration); // 預設值顯示為分鐘

  const handleTimerChange = () => {
    setTimerDuration(inputValue); // 更新全局時間（轉換為毫秒）
    alert(`登出時間已更新為 ${inputValue} 分鐘`);
  };

  // 處理新增經手人
  const addHandler = () => {
    if (newHandler.trim() && !handlers.includes(newHandler)) {
      setHandlers([...handlers, newHandler]);
      setNewHandler(""); // 清空輸入框
    }
  };

  // 處理刪除經手人
  const removeHandler = (handler) => {
    setHandlers(handlers.filter((h) => h !== handler));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">全局設定</h1>

      {/* 設置計時器時間 */}
      <label className="block font-medium mb-2">登出計時器（分鐘）</label>

      <div className="flex mb-6 space-x-4">
        <input
          type="number"
          value={inputValue} // 維持輸入框的臨時值
          onChange={(e) => setInputValue(Number(e.target.value))} // 更新臨時狀態
          className="w-24 border p-2 rounded"
        />
        <button
          onClick={handleTimerChange} // 按下按鈕時才更新全局值
          className="bg-green-500 text-nowrap text-white px-4 rounded hover:bg-green-600"
        >
          確定
        </button>
      </div>

      {/* 經手人管理 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">經手人管理</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="新增經手人名稱"
            value={newHandler}
            onChange={(e) => setNewHandler(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <button
            onClick={addHandler}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            新增經手人
          </button>
        </div>
        <ul>
          {handlers.map((handler, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{handler}</span>
              <button
                onClick={() => removeHandler(handler)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
