// const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const User = require('../models/User');

exports.submitQuiz = async (req, res) => {
  const { userId, answers, selectedTopics } = req.body;

  let score = 0;
  const correctAnswers = [];

  try {
    const questions = await Question.aggregate([
      { $match: { topic: { $in: selectedTopics } } },
      { $sample: { size: 5 } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    questions.forEach((question) => {
      const userAnswer = answers[question._id.toString()];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      }

      correctAnswers.push({
        questionId: question._id.toString(),
        questionText: question.questionText,
        correctAnswer: question.correctAnswer,
        selectedAnswer: userAnswer || "No answer"
      });
    });

    await User.findByIdAndUpdate(userId, { score, selectedTopics });

    res.json({ userId, score, correctAnswers });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};
