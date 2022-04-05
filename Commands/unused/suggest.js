const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'suggest',
    description: 'Create a suggestion',
    options: [
        {
            name: 'suggestion',
            description: 'Suggestion',
            required: true,
            type: 'STRING'
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild } = interaction;

        const Suggestions = guild.channels.cache.get('927491364789293086')

        const Description = options.getString('suggestion')

        const Response = new MessageEmbed()
            .setColor('GREYPLE')
            .setTitle('Suggestion Added')
            .setDescription(`Successfully added your suggestion to ${Suggestions}`)
        
        const Suggestion = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Suggestion')
            .addFields(
                {name: `Submitter`, value: `${interaction.user}`},
                {name: `Description`, value: Description}
            )
            .setThumbnail(interaction.user.avatarURL({dynamic: true}))
        
        interaction.reply({
            ephemeral: true,
            embeds: [Response]
        })

        const message = await Suggestions.send({embeds: [Suggestion]})
        message.react('👍')
        message.react('👎')
    }
} 