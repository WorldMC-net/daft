const { Perms } = require('../Validation/Permissions')

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii('Commands Loaded')

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*.js`)).map(async (file) => {
        const command = require(file)
        const FileName = file.split('/').at(-1)

        if (!command.name) {
            return Table.addRow(FileName, 'Failed', 'Missing name')
        }
        
        if (!command.context && !command.description) {
            return Table.addRow(FileName, 'Failed', 'Missing description')
        }
        
        if (command.permission) {
            if (Perms.includes(command.permission)) {
                command.defaultPermission = false
            } else {
                return Table.addRow(FileName, 'Failed', 'Permission invalid')
            }
        }

        client.commands.set(command.name, command)
        CommandsArray.push(command)

        await Table.addRow(FileName, 'Success')
    })

    console.log(Table.toString())

    // PERMISSIONS CHECK //

    client.on("ready", async () => {
        client.application.commands.set([])
        client.guilds.cache.forEach(guild => {
            guild.commands.set(CommandsArray).then(async (command) => {
                const Roles = (commandName) => {
                    const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission
                    if (!cmdPerms) {
                        return null
                    }
    
                    return guild.roles.cache.filter((r) => r.permissions.has(cmdPerms))
                }
    
                const fullPermissions = command.reduce((accumulator, r) => {
                    const roles = Roles(r.name)
                    if (!roles) {
                        return accumulator
                    }
    
                    const permissions = roles.reduce((a, r) => {
                        return [...a, {id: r.id, type: "ROLE", permission: true} ]
                    }, [])
    
                    return [...accumulator, {id: r.id, permissions}]
                }, [])
    
                await guild.commands.permissions.set({ fullPermissions })
            })
        })
    })
}