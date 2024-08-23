const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        codeBill: {
            type: String,
            required: true,
            unique: true
        },

        sumOfBill: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String
        },

        numberPhone: {
            type: String
        },

        discount: {
            type: Number,
            min: 0.1,
            max: 0.9,
        },

        createAt: {
            type: Date,
            default: Date.now()
        },

        deleteAt: {
            type: Date
        },
        
        status: {
            type: Boolean
        }
    }
)

const Bill = mongoose.model('Bill', schema);
module.exports = Bill;