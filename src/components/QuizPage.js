import React, { useContext } from 'react';
import { StoreContext } from './context/StoreContext';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const {
    selectedQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setAnswers,
    submitAnswers,
    loading,
    error,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: selectedQuestions[currentQuestionIndex]._id, answer },
    ]);
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      submitAnswers();
      navigate('/result');
    }
  };

  if (loading) return <p>Loading questions...</p>;

  if (!selectedQuestions.length) return <p>No questions available.</p>;

  const question = selectedQuestions[currentQuestionIndex];

  return (
    <div>
      <h2>{question.questionText}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option} onClick={() => handleAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QuizPage;
