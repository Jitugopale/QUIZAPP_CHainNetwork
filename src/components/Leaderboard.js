import React, { useContext, useEffect } from 'react';
import { StoreContext } from './context/StoreContext';

const Leaderboard = () => {
  const { leaderboard, fetchLeaderboard } = useContext(StoreContext);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.userId}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
