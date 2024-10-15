const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch the top 10 users from the leaderboard and populate the 'user' field with 'username'
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1 }) // Sort by score in descending order
      .limit(10)            // Limit to top 10 users
      .populate('user', 'username'); // Populate 'user' field with 'username' from the User model

    // Check if there are any entries in the leaderboard
    if (!leaderboard || leaderboard.length === 0) {
      return res.status(404).json({ message: "No users found on the leaderboard." });
    }

    // If leaderboard data exists, return it
    res.json(leaderboard);
  } catch (error) {
    console.error("Error accessing leaderboard:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
