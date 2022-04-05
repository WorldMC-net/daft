const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Guild } = require('discord.js')

module.exports = {
    name: 'embed',
    description: 'Send a premade embed',
    permission: 'ADMINISTRATOR',
    options: [
        {
            name: 'presets',
            description: 'Embed presets',
            required: true,
            type: 'STRING',
            choices: [
                {
                    name: 'support',
                    value: 'support'
                },
                {
                    name: 'notifications',
                    value: 'notifications'
                },
                {
                    name: 'rules',
                    value: 'rules'
                },
                {
                    name: 'about',
                    value: 'about'
                },
                {
                    name: 'store',
                    value: 'store'
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options, guild } = interaction

        const Choice = options.getString('presets')

        const SuccessResponse = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Embed Sent')
            .setDescription('✅ Successfully sent embed')

        const Embed = new MessageEmbed()
            .setColor('ORANGE')

        const Buttons = new MessageActionRow()

        switch (Choice) {
            case 'support': {
                Embed
                    .setTitle('Create Ticket')
                    .setDescription('React below with 🎫 to create a **support ticket**\n\nOur standard support hours are between 8AM and 8PM US Eastern, although we are often available outside of these hours. Please consider using support-chat for non-urgent issues.')

                Buttons.setComponents(
                    new MessageButton()
                        .setCustomId('open_ticket')
                        .setEmoji('🎫')
                        .setLabel('Open Ticket')
                        .setStyle('PRIMARY')
                )
            }
                break
            case 'notifications': {
                Embed
                    .setTitle('📢 Notifications')
                    .setDescription('React below with 🚧 to toggle **update notifications**\nReact below with 🎠 to toggle **event notifications**\n\nYou can opt out of notifications at any time by reacting to the notification you wish to remove.')

                Buttons.setComponents(
                    new MessageButton()
                        .setCustomId('toggle_update')
                        .setEmoji('🚧')
                        .setLabel('Toggle Updates')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('toggle_event')
                        .setEmoji('🎠')
                        .setLabel('Toggle Events')
                        .setStyle('SECONDARY')
                )
            }
                break
            case 'rules': {
                Embed
                    .setTitle('📜 Rules')
                    .addField(
                        '1. Chat Rules',
                        '```json\n1.1 Do not impersonate, mock, disobey or disrespect staff.\n1.2 Do not spam or frequently post repetitive messages.\n1.3 Do not advertise a non-WorldMC community.\n1.4 Do not reference non-child friendly content.\nNon-child friendly content does not include swearing.```'
                    )
                    .addField(
                        '2. World Rules',
                        'All rules are documented on the official website [rules page](https://worldmc.net/rules)'
                    )
            }
                break
            case 'about': {
                Embed
                    .setTitle('📙 About')
                    .addField(
                        '❓ FAQ',
                        '``What is the server version?``\n1.18.2\n\n``Where is the dynmap?``\nDynmap can be found on the [map page](https://worldmc.net/map)\n\n``Can I teleport to other players?``\nNo. But you can teleport to other town spawns using **/t spawn <town-name>**\n\n``Is there bedrock support?``\nNo.\n\n``What about cracked accounts?``\nNo. Never. Negative.\n\n``Where can I ask more questions or get help?``\nAsk the community for help in ' + `${guild.channels.cache.get('952859750675136522')}` + ' or create a ticket and talk with staff in ' + `${guild.channels.cache.get('952859708895670292')}`
                    )
                    .addField(
                        '🎖️ Roles',
                        `${guild.roles.cache.get('952852491337338911')} - The creators, founders, CEOs\n${guild.roles.cache.get('952851029081354280')} - Server Administrators\n${guild.roles.cache.get('952852189381029928')} - Our Moderators (Law enforcement 😎)\n${guild.roles.cache.get('952852857508495380')} - Contract Developers *$$*\n${guild.roles.cache.get('952852860574527508')} - Diamond Rank Players ~ **Coolest rank!**\n${guild.roles.cache.get('952852861350465536')} - Emerald Rank Players\n${guild.roles.cache.get('952852862025756682')} - Gold Rank Players\n${guild.roles.cache.get('952856104973533184')} - Discord Boosters\n${guild.roles.cache.get('952850930318049320')} - WorldMC players, the most important people!\n`
                    )
                    .addField(
                        '🗳️ Voting',
                        'Did you know you can **earn gold just by voting for WorldMC?¿**\nAll information on voting is documented on the official [voting page](https://worldmc.net/voting)'
                    )
            }
                break
            case 'store': {
                Embed
                    .setTitle('💰 Store')
                    .setDescription('**All purchasable products are listed on our online [store](https://store.worldmc.net)**\n\nAll purchases help cover the costs of running, maintaining and upgrading WorldMC.\n``Payments are handled securely through the Tebex Checkout system.``')
            }
        }

        if (Buttons.components.length == 0) {
            await channel.send({
                embeds: [Embed]
            })
        } else {
            await channel.send({
                embeds: [Embed],
                components: [Buttons]
            })
        }

        interaction.reply({
            ephemeral: true,
            embeds: [SuccessResponse]
        })
    }
}