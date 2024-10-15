const express = require("express");
const router = express.Router();
const Question = require("../models/Question"); // Assuming your Question model is in the models folder
const fetchuser = require('../middleware/fetchUser'); // Middleware to fetch user details, if needed

// Route to fetch all unique topics
router.get("/select", fetchuser, async (req, res) => {
  try {
    // Use MongoDB's distinct method to fetch unique topic names from the Question collection
    const topics = await Question.distinct("topic");

    // Log fetched topics for debugging
    console.log("Fetched Topics:", topics);

    // Check if topics were found
    if (topics.length === 0) {
      return res.status(404).json({ message: "No topics found." });
    }

    // Respond with the list of unique topics
    res.json(topics);
  } catch (error) {
    // Handle errors and send a response with a status code 500
    console.error("Error fetching topics: ", error.message);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

module.exports = router;
