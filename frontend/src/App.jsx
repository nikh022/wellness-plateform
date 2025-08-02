import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import * as api from "./api/api";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MySessionsPage from "./pages/MySessionsPage";
import SessionEditorPage from "./pages/SessionEditorPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = async (formData) => {
    try {
      const { data } = await api.login(formData);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/" element={<DashboardPage />} />

          <Route
            path="/my-sessions"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <MySessionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id?"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <SessionEditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
