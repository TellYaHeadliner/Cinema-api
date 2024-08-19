const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    codePos:{
        type: String,
        required: true,
    },

    codeRoom:{
        type: Stirng, 
        required: true,
    }
})

const Position = new mongoose.model('Position', Schema);
export default Position;