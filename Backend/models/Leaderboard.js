const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  quizTopic: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;
