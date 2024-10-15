const express = require('express');
const { getTopics, getQuestionsByTopic } = require('../controllers/questionController');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();

router.get('/select', fetchuser, getTopics);
router.get('/questions', getQuestionsByTopic);

module.exports = router;
