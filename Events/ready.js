const { Client, User } = require("discord.js")
const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config()

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        console.log(`${client.user.username} is online.`)
        client.user.setActivity("you!", {type: "WATCHING"})

        if (!process.env.DATABASE) return;
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`${client.user.username} has connected to MongoDB.`)
        }).catch((err) => {
            console.log(err)
        })
    }
}