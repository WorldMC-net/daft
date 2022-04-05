const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    async execute(oldMessage, newMessage) {
        const { member, guild, channel } = oldMessage;

        if (member.user.bot || oldMessage.content == newMessage.content) {
            return
        }

        const Log = guild.channels.cache.get('952864204166152202')

        const Delete = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('Message Edited')
            .addFields(
                {name: 'Author', value: `${member.user}`, inline: true},
                {name: 'Channel', value: `${channel}`, inline: true}
            )
        
        for (let i = 0; i < oldMessage.content.length; i += 1024) {
            const Cont = oldMessage.content.substring(i, Math.min(oldMessage.content.length, i + 1024));
            if (i < 1024) {
                Delete.addField('Old Message', Cont)
            } else {
                Delete.addField('\u200B', Cont)
            }
        }

        for (let i = 0; i < newMessage.content.length; i += 1024) {
            const Cont = newMessage.content.substring(i, Math.min(newMessage.content.length, i + 1024));
            if (i < 1024) {
                Delete.addField('New Message', Cont)
            } else {
                Delete.addField('\u200B', Cont)
            }
        }


        await Log.send({ embeds: [Delete] })
    }
}