import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
    {
        codeBill: {
            type: String,
            required: true,
            unique: true
        },

        sumofBill: {
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
        },
    }
)

const Bill = Bill.model('Bill', Schema);
module.exports = Bill;