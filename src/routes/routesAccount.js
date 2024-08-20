const express = require('express');
const { signIn, signUp, forgotPassword, resetYourPassword, deleteAccount, deleteAccountHard, updateAccount } = require('../controllers/AccountController')

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/forgotPassword', forgotPassword)
router.get('/resetYourPassword', resetYourPassword)
router.post('/deleteAccount', deleteAccount);
router.delete('/deleteAccountHard', deleteAccountHard)
router.put('/updateAccount', updateAccount);
module.exports = router;
