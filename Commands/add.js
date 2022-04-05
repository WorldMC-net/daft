const { CommandInteraction, MessageEmbed } = require('discord.js')
const TicketsDB = require('../Structures/Schemas/Tickets')

module.exports = {
    name: 'add',
    description: 'Add a user to the ticket',
    permission: 'MANAGE_MESSAGES', 
    options: [
        {
            name: 'target',
            description: 'Target user',
            type: 'USER',
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options, guild } = interaction

        const ChannelEntry = await TicketsDB.findOne({ ChannelID: channel.id })
        const Target = options.getUser('target')

        const SuccessResponse = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`User Added`)
            .setDescription(`✅ Successfully added ${Target}`)
        
        const FailResponse = new MessageEmbed()
            .setColor('GREYPLE')
            .setTitle('Command Failed')
        
        if (ChannelEntry === null) {
            FailResponse.setDescription('⚠️ You can only use this command in a ticket')
        } else if (Target.bot) {
            FailResponse.setDescription('⚠️ You cannot add this user')
        } else if (channel.permissionOverwrites.cache.has(Target.id) || guild.members.cache.get(Target.id).roles.cache.hasAny('952852491337338911', '952851029081354280', '952852189381029928')) {
            FailResponse.setDescription('⚠️ This user is already added')
        } else {
            interaction.reply({
                embeds: [SuccessResponse]
            })
            channel.permissionOverwrites.edit(Target, { 'VIEW_CHANNEL': true })
            return
        }

        interaction.reply({
            ephemeral: true,
            embeds: [FailResponse]
        })
    }
}