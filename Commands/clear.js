const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Clear up to 100 messages from everyone or a target',
    permission: 'MANAGE_MESSAGES',
    options: [
        {
            name: 'amount',
            description: 'Amount of messages',
            type: 'INTEGER',
            required: true,
            min_value: 1,
            max_value: 100
        },
        {
            name: 'target',
            description: 'Target user',
            type: 'USER',
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options, user, guild } = interaction

        const Amount = options.getInteger('amount')
        const Target = options.getUser('target')
        let Plural = 'message'

        const Messages = await channel.messages.fetch()

        const SuccessResponse = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Messages Cleared')

        if (Amount > 1) {
            Plural = 'messages'
        }

        if (Target) {
            let i = 0
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m)
                    i++
                }
            })
            await channel.bulkDelete(filtered, true).then(messages => {
                SuccessResponse.setDescription(`✅ Successfully cleared ${messages.size} ${Plural} from ${Target}`)
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                SuccessResponse.setDescription(`✅ Successfully cleared ${messages.size} ${Plural}`)
            })
        }

        interaction.reply({
            ephemeral: true,
            embeds: [SuccessResponse]
        })
    }
}