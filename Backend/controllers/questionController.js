const Question = require('../models/Question');

exports.getTopics = async (req, res) => {
  try {
    const topics = await Question.distinct("topic");
    
    if (topics.length === 0) {
      return res.status(404).json({ message: "No topics found." });
    }

    res.json(topics);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

exports.getQuestionsByTopic = async (req, res) => {
  const { topics } = req.query;
  const topicArray = topics.split(",");

  try {
    const questions = await Question.find({ topic: { $in: topicArray } });
    
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for the selected topics." });
    }

    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
