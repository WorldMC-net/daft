const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { createTranscript } = require('discord-html-transcripts')
const TicketsDB = require('../Structures/Schemas/Tickets')
const TicketsIdDB = require('../Structures/Schemas/TicketsId')

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, user, channel, customId, client } = interaction

        if (customId == 'open_ticket') {
            const ActiveEntry = await TicketsDB.findOne({ Active: true, UserID: user.id })

            if (ActiveEntry !== null) {
                const Channel = guild.channels.cache.get(ActiveEntry.ChannelID)

                if (!Channel) {
                    await TicketsDB.updateOne({ ChannelID: ActiveEntry.ChannelID }, { Active: false })
                    openTicket()
                    return
                }
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new MessageEmbed()
                            .setColor('GREYPLE')
                            .setTitle('Interaction Failed')
                            .setDescription(`⚠️ You already have a ticket in ${Channel}`)
                    ]
                })
            } else {
                openTicket()
            }
        } else if (customId == 'close_ticket') {
            closeTicket()
        }

        async function openTicket() {
            interaction.deferUpdate()

            const TicketsCategory = guild.channels.cache.get('952859830660497418')
            let CurrentId = await TicketsIdDB.findOne({})
            CurrentId.IdNum += 1
            await CurrentId.save()

            await TicketsCategory.createChannel(`ticket-${user.username}`, {
                type: 'GUILD_TEXT',
            }).then(async (channel) => {
                await TicketsDB.create({
                    TicketID: CurrentId.IdNum,
                    GuildID: guild.id,
                    UserID: user.id,
                    ChannelID: channel.id,
                    Active: true
                })

                await channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor('ORANGE')
                            .setTitle('Support Ticket Opened')
                            .setDescription(`Thank-you ${user} for opening a support ticket.\n\nOur staff will be with you as soon as possible, in order for us to best assist you, please provide your Minecraft username and a description of your issue below.`)
                    ],
                    components: [
                        new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('close_ticket')
                                    .setEmoji('🔒')
                                    .setLabel('Close Ticket')
                                    .setStyle('DANGER')
                            )
                    ]
                })

                channel.permissionOverwrites.edit(user, { 'VIEW_CHANNEL': true })

                channel
                    .send({ content: '@everyone' })
                    .then((m) => {
                        m.delete().catch(() => { })
                    })
            })
        }

        async function closeTicket() {
            interaction.deferUpdate()

            await TicketsDB.updateOne({ ChannelID: channel.id }, { Active: false })

            const TicketArchiveChannel = guild.channels.cache.get('952859855658573824')
            const ChannelEntry = await TicketsDB.findOne({ ChannelID: channel.id })
            const creator = await client.users.fetch(ChannelEntry.UserID)

            const attachment = await createTranscript(channel, {
                limit: -1,
                returnBuffer: false,
                fileName: `${channel.name}.html`
            })

            const openedDate = Math.floor(new Date(ChannelEntry.createdAt).getTime()/1000)
            const closedDate = Math.floor(Date.now()/1000)

            const Embed = new MessageEmbed()
                .setColor('ORANGE')
                .setTitle('Support Ticket Archived')
                .setDescription(`🔗 **Transcript:** Attached\n📰 **Ticket ID:** \`\`#${ChannelEntry.TicketID}\`\``)
                .addField('Opened', `**⁍ By:** ${creator}\n**⁍ On:** <t:${openedDate}:D>\n**⁍ At:** <t:${openedDate}:T>`, true)
                .addField('Closed', `**⁍ By:** ${user}\n**⁍ On:** <t:${closedDate}:D>\n**⁍ At:** <t:${closedDate}:T>`, true)

            TicketArchiveChannel.send({
                embeds: [Embed],
                files: [attachment]
            })  

            if (guild.members.cache.get(ChannelEntry.UserID)) {
                creator.send({
                    embeds: [Embed],
                    files: [attachment]
                })
            }

            channel.delete()
        }
    }
}