const { CommandInteraction, MessageEmbed } = require('discord.js')
const TicketsDB = require('../Structures/Schemas/Tickets')

module.exports = {
    name: 'remove',
    description: 'Remove a user to the ticket',
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

        const GreenResponse = new MessageEmbed()
            .setColor('RED')
            .setTitle(`User Removed`)
            .setDescription(`✅ Successfully removed ${Target}`)
        
        const FailResponse = new MessageEmbed() 
            .setColor('GREYPLE')
            .setTitle(`Command Failed`)
        
        if (ChannelEntry === null) {
            FailResponse.setDescription('⚠️ You can only use this command in a ticket')
        } else if (Target.bot || guild.members.cache.get(Target.id).roles.cache.hasAny('952852491337338911', '952851029081354280', '952852189381029928')) {
            FailResponse.setDescription('⚠️ You cannot remove this user')
        } else if (!channel.permissionOverwrites.cache.has(Target.id)) {
            FailResponse.setDescription('⚠️ This user is already removed')
        } else {
            interaction.reply({
                embeds: [GreenResponse]
            })
            channel.permissionOverwrites.delete(Target)
            return
        }

        interaction.reply({
            ephemeral: true,
            embeds: [FailResponse]
        })
    }
}