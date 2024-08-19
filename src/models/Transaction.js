const mongoose = require('mongoose');

// Constructor 
const date = new Date();

const Schema = new mongoose.Schema(
    {
        codeTransaction: {
            type: String,
            required: true,
            unique: true,
        },

        codeBill: {
            type: String,
        },

        bankAccount:{
            type: String,
            required: true,
        }
    }
)

const Transaction = new mongoose.model('Transaction', Schema);

export default Transaction;