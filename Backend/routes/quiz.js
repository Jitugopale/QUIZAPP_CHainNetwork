const express = require('express');
const { submitQuiz } = require('../controllers/quizController');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();

router.post('/submit-quiz', fetchuser, submitQuiz);

module.exports = router;
