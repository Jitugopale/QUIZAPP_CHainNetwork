const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  selectedTopics: [{ type: String }], // Array of topic names
  score: { type: Number, default: 0 }, // Ensure score field exists
});

module.exports = mongoose.model('User', userSchema);
