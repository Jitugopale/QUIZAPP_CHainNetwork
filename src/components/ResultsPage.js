import React, { useContext } from 'react';
import { StoreContext } from './context/StoreContext';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const {
    quizResults,
    leaderboard,
    fetchLeaderboard,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  if (!quizResults) return <p>No results available.</p>;

  return (
    <div>
      <h2>Your Results</h2>
      <p>Score: {quizResults.score}</p>
      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.userId}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/topics')}>Go to Topics</button>
    </div>
  );
};

export default ResultPage;
