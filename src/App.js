import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import TopicSelection from "./components/TopicSelection";
import QuizPage from "./components/QuizPage";
import ResultsPage from "./components/ResultsPage";
import Leaderboard from "./components/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

       
        <Route
          path="/select"
          element={
            <ProtectedRoute>
              <Logout />
              <TopicSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz" 
          element={
            <ProtectedRoute>
              <Logout />
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results" 
          element={
            <ProtectedRoute>
              <Logout />
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Logout />
              <Leaderboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
