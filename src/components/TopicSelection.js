import React, { useContext, useEffect } from 'react';
import { StoreContext } from './context/StoreContext';
import { useNavigate } from 'react-router-dom';

const TopicSelection = () => {
  const {
    fetchTopics,
    topics,
    fetchQuestions,
    loading,
    error,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleSelectTopic = (topic) => {
    fetchQuestions(topic);
    navigate('/quiz');
  };

  return (
    <div>
      <h2>Select a Topic</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading topics...</p>
      ) : (
        <ul>
          {topics.map((topic) => (
            <li key={topic} onClick={() => handleSelectTopic(topic)}>
              {topic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopicSelection;
