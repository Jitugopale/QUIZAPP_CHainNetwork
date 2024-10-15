import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopicSelection = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication failed. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5002/api/topics/select", {
          headers: { 'auth-token': token }, 
        });
        setTopics(response.data); 
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Error fetching topics. Please try again.";
        setError(errorMessage);
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicChange = (topic) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter((t) => t !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

  const handleStartQuiz = async () => {
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5002/api/quiz/questions", {
        headers: { 'auth-token': localStorage.getItem("token") },
        params: { topics: selectedTopics.join(",") },
      });

      const questions = response.data;
      console.log("Fetched questions:", questions);

      navigate("/quiz", { state: { questions } });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error starting quiz. Please try again.";
      setError(errorMessage);
      console.error("Error starting quiz:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading topics...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Select Topics for Your Quiz</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div key={topic} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={topic}
                checked={selectedTopics.includes(topic)}
                onChange={() => handleTopicChange(topic)}
              />
              <label className="form-check-label" htmlFor={topic}>
                {topic}
              </label>
            </div>
          ))
        ) : (
          <div>No topics available.</div>
        )}
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={handleStartQuiz}
        disabled={selectedTopics.length === 0}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default TopicSelection;
