const express = require('express');
const { createBill, getBill, deleteBill, updateBill } = require('../controllers/BillController')

const router = express.Router();

router.post('/Bill', createBill);
router.get('/Bill/:codeBill', getBill);
router.delete('/Bill/delete/', deleteBill);
router.put('Bill/update', updateBill)

module.export = router;