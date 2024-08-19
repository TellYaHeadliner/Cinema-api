const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    codeRoom: {
        type: String,
        required: true,
    },
    codeCinema: {
        type: String,
        required: true,
    }
})

const Room = new mongoose.model('Room', Schema);
export default Room;