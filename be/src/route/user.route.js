const express = require('express');
const router = express.Router();
const { getAllUsers, register, login, getInfo, updateProfile } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/auth');

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getInfo);
router.put('/me', verifyToken, updateProfile);

module.exports = router;
