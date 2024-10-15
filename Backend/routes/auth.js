const express = require('express');
const { createUser, login, getUser } = require('../controllers/authController');
const fetchuser = require('../middleware/fetchUser');
const { body } = require('express-validator');
const router = express.Router();

router.post('/createUser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], createUser);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

router.get('/getuser', fetchuser, getUser);

module.exports = router;
