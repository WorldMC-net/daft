const mongoose = require('mongoose')

const ticketsIdSchema = mongoose.Schema(
    {
        IdNum: Number
    }
);

module.exports = mongoose.model('TicketsId', ticketsIdSchema, 'ticketsId')