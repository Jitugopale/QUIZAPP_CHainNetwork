import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { score = 0, correctAnswers = [] } = location.state || {};

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="container mt-5">
      <h2>Your Results</h2>
      <p>Your score: {score}</p>
      {correctAnswers.length === 0 ? (
        <p>No answers to display.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {correctAnswers.map((answer) => (
                <tr key={answer.questionId}>
                  <td>{answer.questionText}</td>
                  <td>{answer.selectedAnswer}</td>
                  <td>{answer.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/topics")}>
        Back to Topics
      </button>
      <button className="btn btn-primary mt-3 ms-2" onClick={() => navigate("/quiz")}>
        Retry Quiz
      </button>
      <button className="btn btn-info mt-3 ms-2" onClick={handleViewLeaderboard}>
        View Leaderboard
      </button>
    </div>
  );
};

export default ResultsPage;
