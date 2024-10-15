import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { state } = useLocation();
  const { questions = [], selectedTopics = [] } = state || {};
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      const isSelected = currentAnswers.includes(selectedOption);

      return {
        ...prevAnswers,
        [questionId]: isSelected
          ? currentAnswers.filter((option) => option !== selectedOption) 
          : [...currentAnswers, selectedOption], 
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to submit the quiz");
        return;
      }

      const userId = localStorage.getItem("userId");

      if (typeof userId !== "string") {
        throw new Error("userId must be a string");
      }

      if (typeof selectedAnswers !== "object" || selectedAnswers === null) {
        throw new Error("answers must be an object");
      }

      if (!Array.isArray(selectedTopics)) {
        throw new Error("selectedTopics must be an array");
      }

      const answers = { ...selectedAnswers }; 
      // Make the POST request
      const response = await axios.post(
        "http://localhost:5002/api/quiz/submit-quiz",
        {
          userId,
          answers,
          selectedTopics,
        },
        { headers: { "auth-token": token } }
      );

      navigate("/results", {
        state: {
          score: response.data.score,
          correctAnswers: response.data.correctAnswers,
        },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz. Please try again.");
    }
  };

  if (questions.length === 0) {
    return (
      <div className="alert alert-warning">
        No questions available. Please go back and select topics.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <h2>Your Quiz</h2>
      <div className="mb-4">
        <h5>{currentQuestion.question}</h5>
        
        {currentQuestion.options.map((option, index) => (
          <div key={`${currentQuestion.id}-${index}`} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name={`question-${currentQuestion.id}`} 
              value={option}
              onChange={() => handleAnswerSelect(currentQuestion.id, option)}
              checked={selectedAnswers[currentQuestion.id]?.includes(option)}
              id={`${currentQuestion.id}-${index}`}
            />
            <label className="form-check-label" htmlFor={`${currentQuestion.id}-${index}`}>
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button
          onClick={handlePreviousQuestion}
          className="btn btn-secondary"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNextQuestion} className="btn btn-primary">
            Next
          </button>
        ) : (
          <button onClick={handleSubmitQuiz} className="btn btn-success">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
