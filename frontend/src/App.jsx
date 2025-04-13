// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HelloPage from "./pages/HelloPage"; // New page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/hello" element={<HelloPage />} />
      </Routes>
    </Router>
  );
}

export default App;
