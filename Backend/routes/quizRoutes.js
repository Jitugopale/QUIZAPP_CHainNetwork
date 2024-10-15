const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // Assuming your Question model is in the models folder
const User = require("../models/User"); // Import the User model
const fetchuser = require('../middleware/fetchUser');

// Route to fetch all unique topics
router.get("/select", fetchuser, async (req, res) => {
  try {
    const topics = await Question.distinct("topic");

    console.log("Fetched Topics:", topics);

    if (topics.length === 0) {
      return res.status(404).json({ message: "No topics found." });
    }

    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error.message);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

// Route to get questions by multiple topics;

// Route to fetch questions based on selected topics
router.get("/questions", async (req, res) => {
  const { topics } = req.query; // Get topics from query params
  const topicArray = topics.split(","); // Split the topics into an array

  try {
    const questions = await Question.find({ topic: { $in: topicArray } }); // Find questions matching the topics
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for the selected topics." });
    }
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Route to handle quiz submission

router.post("/submit-quiz", fetchuser, async (req, res) => {
  const { userId, answers, selectedTopics } = req.body;

  // Validate request body
  if (!userId || typeof userId !== 'string' || !answers || typeof answers !== 'object' || !Array.isArray(selectedTopics)) {
    return res.status(400).json({ message: "Invalid data provided. Ensure userId is a string, answers is an object, and selectedTopics is an array." });
  }

  let score = 0;
  const correctAnswers = [];

  try {
    // Fetch questions for the selected topics
    const questions = await Question.aggregate([
      { $match: { topic: { $in: selectedTopics } } },
      { $sample: { size: 5 } }
    ]);

    // Check if questions were fetched
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for the selected topics." });
    }

    // Calculate score and prepare correctAnswers array
    questions.forEach((question) => {
      const userAnswer = answers[question._id.toString()];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      }

      correctAnswers.push({
        questionId: question._id.toString(),
        questionText: question.question,
        correctAnswer: question.correctAnswer,
        selectedAnswer: userAnswer || "No answer",
        id: question._id.toString() // Include the id field here
      });
    });

    // Update the user's score and selected topics
    await User.findByIdAndUpdate(userId, {
      $set: {
        score,
        selectedTopics,
      },
    }, { new: true });

    console.log("User updated successfully.");
    
    // Include userId in the response
    res.json({ userId, score, correctAnswers });
  } catch (error) {
    console.error("Error processing quiz submission:", error);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
});

module.exports = router;
