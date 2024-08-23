const express = require('express');

const { createBill, getBill, deleteBill, deleteHard } = require('../controllers/BillController')

const router = express.Router();

router.post('/createBill', createBill);

router.get('/Bill/delete/', deleteBill);
router.get('/Bill/:numberPhone', getBill);

router.delete('/Bill/deleteHard', deleteHard);

module.exports = router;