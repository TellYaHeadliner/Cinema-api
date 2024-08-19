const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    codeCinema: {
        type: String,
        required: true,
        unique: true,
    },

    address:{
        type: String,
        required: true,
        unique: true,
    },

    Status:{
        type: boolean,
    },

    Open:{
        type: Date,
        required: true,   
    },

    Close:{
        type: Date,
        required: true,
    }
})

const Cinema = new mongoose.model('Cinema', Schema);
module.exports = Cinema;