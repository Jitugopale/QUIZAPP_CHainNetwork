const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1 })
      .limit(10)           
      .populate('user', 'username'); 

    if (!leaderboard || leaderboard.length === 0) {
      return res.status(404).json({ message: "No users found on the leaderboard." });
    }

    res.json(leaderboard);
  } catch (error) {
    console.error("Error accessing leaderboard:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
