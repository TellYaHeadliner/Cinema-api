const express = require('express');
const { signIn, signUp, forgotPassword, resetYourPassword } = require('../controllers/AccountController')

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/forgotPassword', forgotPassword)
router.get('/resetYourPassword', resetYourPassword)

module.exports = router;
