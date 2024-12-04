import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      alert("登入成功！");
      window.location.href = "/"; // 跳轉到首頁
    } else {
      alert("帳號或密碼錯誤！");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">登入系統</h1>
      <div className="mb-4">
        <label className="block font-medium mb-1">帳號</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">密碼</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        登入
      </button>
    </div>
  );
};

export default Login;
