const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message
     */
    async execute(message) {
        const { guild, author, channel, content } = message;

        if (author.bot) {
            return
        }

        const Log = guild.channels.cache.get('952864204166152202')

        const Delete = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Message Deleted')
            .addFields(
                {name: 'Author', value: `${author}`, inline: true},
                {name: 'Channel', value: `${channel}`, inline: true},
            )
        
        for (let i = 0; i < content.length; i += 1024) {
            const Cont = content.substring(i, Math.min(content.length, i + 1024));
            if (i < 1024) {
                Delete.addField('Message', Cont)
            } else {
                Delete.addField('\u200B', Cont)
            }
        }

        await Log.send({ embeds: [Delete] })
    }
}