const { ButtonInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const { member, customId } = interaction

        const UpdateRoleID = '952853447600922624'
        const EventRoleID = '952852862411624490'
        const SuccessResponse = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Notification Toggled')

        if (customId == 'toggle_update') {
            SuccessResponse.setDescription(`✅ Successfully disabled update notifications`)
            toggleNotification(UpdateRoleID)
        } else if (customId == 'toggle_event') {
            SuccessResponse.setDescription(`✅ Successfully disabled event notifications`)
            toggleNotification(EventRoleID)
        } else {
            return
        }

        function toggleNotification(RoleID) {
            if (member.roles.cache.has(RoleID)) {
                member.roles.remove(RoleID)
            } else {
                member.roles.add(RoleID)
            }
            interaction.reply({
                ephemeral: true,
                embeds: [SuccessResponse]
            })
        }
    }
}