const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();

router.get('/leaderboard', fetchuser, getLeaderboard);

module.exports = router;
