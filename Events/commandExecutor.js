const { Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { commandName } = interaction
        if (!interaction.isCommand()) {
            return
        }
        const command = client.commands.get(commandName)
        if (!command) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Error')
                        .setDescription('An error occured.')
                ]
            }) && client.commands.delete(commandName)
        }
        command.execute(interaction, client)
    }
}