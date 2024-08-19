const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    codeFilm:{
        type: String,
        required: true,
        unique: true,
    },

    nameFilm:{
        type: String,
        required: true,
    },

    releaseDates:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    image:{
        type: String,
        required: true,
    },

    genre:{
        type: String,
        required: true,
    }
})

const Film = new mongoose.model('Film', Schema);
export default Film;