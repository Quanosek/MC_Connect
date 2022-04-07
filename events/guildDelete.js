/* <--- Import ---> */

const clr = require('colors');

const realDate = require('../functions/realDate.js')

const Database = require('@replit/database')
const db = new Database()


/* <--- Event ---> */

module.exports = {
    name: 'guildDelete',

    async execute(client, guild) {

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

    }
};