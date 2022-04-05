const { MessageEmbed, GuildMember } = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member
     */
     async execute(member) {
        const { user, guild } = member;

        member.roles.add('952850930318049320')

        const General = guild.channels.cache.get('952860971813183508')

        const Welcome = new MessageEmbed()
            .setColor("ORANGE")
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setTitle("New Member")
            .setDescription(`Welcome ${user}, to **${guild.name}!**`)

        await General.send({ embeds: [Welcome] }).then(async () => {
            await General
                .send({ content: `${user}` })
                .then((m) => {
                    m.delete().catch(() => { })
                })
        })
    }
}