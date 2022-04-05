const { MessageReaction, MessageEmbed } = require("discord.js")
const FeaturesDB = require('../Structures/Schemas/Features')

module.exports = {
    name: "messageReactionAdd",
    /**
     * 
     * @param {MessageReaction} messageReaction
     */
    async execute(messageReaction) {
        const { message, emoji, count } = messageReaction;
        const { guild, author, channel, attachments } = message;

        const AlreadyFeatured = await FeaturesDB.findOne({ MessageID: message.id })
        const GalleryChannel = guild.channels.cache.get('952861056424869898')
        const FeaturedChannel = guild.channels.cache.get('952861249228664832')
        const Requirement = 10

        if (AlreadyFeatured != null || count < Requirement || emoji.name != '⭐' || !channel.equals(GalleryChannel)) {
            return
        }

        const Feature = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Post Featured')
            .setImage(attachments.first().url)
            .addField('Submitter', `${author}`)

        await FeaturesDB.create({
            MessageID: message.id
        })

        await FeaturedChannel
            .send({ embeds: [Feature] })
            .then((m) => {
                m.react('😍')
            })
    }
}