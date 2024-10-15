const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  selectedTopics: [{ type: String, required: true }],
  submittedAnswers: [{ type: String }],
  score: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('Quiz', quizSchema);
