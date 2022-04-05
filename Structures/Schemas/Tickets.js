const mongoose = require('mongoose')

const ticketsSchema = mongoose.Schema(
    {
        TicketID: Number,
        GuildID: String,
        UserID: String,
        ChannelID: String,
        Active: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tickets', ticketsSchema, 'tickets')