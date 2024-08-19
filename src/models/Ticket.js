const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        ticketCode: {
            type: String,
            required: true,
        },

        position:{
            type: String,
            required: true,
        },

        codeBill:{
            type: String,
            required: true,
        },
    }
)

const Ticket = new mongoose.model('Ticket', Schema);
export default Ticket;