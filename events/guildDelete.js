/** IMPORT */

const clr = require('colors');

const realDate = require('../functions/realDate.js');
const schema = require('../schemas/guilds.js');

/** GUILD DELETE EVENT */

module.exports = {
    name: 'guildDelete',

    async run(client, guild) {

        const db = await schema.findOne({ guildId: msg.guild.id }); // database

        /* <--- delete log ---> */

        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${guild.name}, ${guild.id}\n>> Bot ` + clr.brightRed(`left`) + ` the server!`);

        /* <--- auto-delete data-base ---> */

        if (db.get(`serverIP_${guild.id}`)) {
            await db.delete(`serverIP_${guild.id}`);
        };
        if (db.get(`link_${guild.id}`)) {
            await db.delete(`link_${guild.id}`);
        };
        if (db.get(`statusChannelID_${guild.id}`)) {
            await db.delete(`statusChannelID_${guild.id}`);
        };
        if (db.get(`playersChannelID_${guild.id}`)) {
            await db.delete(`playersChannelID_${guild.id}`);
        };

    },
};