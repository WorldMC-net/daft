const { Events } = require('../Validation/EventNames');

module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii('Events Loaded');

    (await PG(`${process.cwd()}/Events/*.js`)).map(async (file) => {
        const event = require(file)
        const FileName = file.split('/').at(-1)

        if (!event.name) {
            return Table.addRow(FileName, 'Failed', 'Missing name')
        }
        
        if (!Events.includes(event.name)) {
            return Table.addRow(FileName, 'Failed', 'Event invalid')
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }

        await Table.addRow(FileName, 'Success')
    })

    console.log(Table.toString());
}