const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message
     */
    async execute(message) {
        const { guild, author, channel, attachments, embeds } = message;

        const GalleryChannel = guild.channels.cache.get('952861056424869898')

        if (author.bot || !channel.equals(GalleryChannel)) {
            return
        }

        const FailResponse = new MessageEmbed()
            .setColor('RED')
            .setTitle('Message Deleted')
        
        if (attachments.size == 0) {
            FailResponse.setDescription('⚠️ You cannot talk in gallery')
        } else if (!attachments.first().contentType.includes('image')) {
            FailResponse.setDescription('⚠️ You can only send image media')
        } else if (attachments.size > 1) {
            FailResponse.setDescription('⚠️ You cannot send multiple images')
        } else {
            message.react('⭐')
            return
        }

        message.delete()
        author.send({
            embeds: [FailResponse]
        }).catch((e) => {})
        return
    }
}