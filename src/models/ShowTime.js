const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    codeTime:{
        type: String,
        required: true,
        unique: true,
    },

    codeFilm:{
        type: String,
        required: true,
    },

    codeRoom:{
        type: String,
        required: true,
    },

    openingDay:{
        type: Date,
        required: true,
    },

    time:{
        type: Date,
        required: true,
    }
})

const ShowTime = new mongoose.model('ShowTime', Schema);
export default ShowTime;