const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv");
const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

dotenv.config()

client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
});

client.login(process.env.TOKEN).then(() => {
    console.log(`Client logged in as ${client.user.username}`)
}).catch((err) => {
    console.log(err)
})