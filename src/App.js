import React, { useState } from "react";
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
import { StoreProvider } from "../src/components/context/StoreContext"; // Import the context provider

const App = () => {
  // State management for selected topics, questions, and user ID
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userId, setUserID] = useState("");

  return (
    <StoreProvider value={{ selectedTopics, setSelectedTopics, questions, setQuestions, userId, setUserID }}>
      <Router>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Login Route */}
          <Route path="/login" element={<Login setUserID={setUserID} />} />

          {/* Protected Routes for authenticated users */}
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
            path="/quiz" // Quiz page for taking the quiz
            element={
              <ProtectedRoute>
                <Logout />
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results" // Results page to show quiz results
            element={
              <ProtectedRoute>
                <Logout />
                <ResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard" // Leaderboard page to view top scores
            element={
              <ProtectedRoute>
                <Logout />
                <Leaderboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
