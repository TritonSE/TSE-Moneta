import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetPassword from "./pages/SetPassword";

import "./css/index.css";

export default function App() {
  const orgInfo = window.localStorage.getItem("orgInfo");
  const userInfo = window.localStorage.getItem("userInfo");

  if (orgInfo) {
    const currTime = new Date();

    if (currTime > Date.parse(orgInfo.expiry)) localStorage.removeItem("orgInfo");

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (userInfo) {
    const currTime = new Date();

    if (currTime > Date.parse(userInfo.expiry)) localStorage.removeItem("userInfo");

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setPassword/:userId" element={<SetPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
