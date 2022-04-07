/* <--- Import ---> */

const ms = require('ms');
const fetch = require('node-fetch');
const clr = require('colors');

const config = require('../config.json');
const realDate = require('../functions/realDate.js')

const Database = require('@replit/database');
const db = new Database();


/* <--- Event ---> */

module.exports = {
  name: 'ready',

  execute(client) {

    /* <--- on-ready ---> */

    console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Bot logged in successfully.\n`);
    client.user.setActivity('Minecraft');

    /* <--- auto-update channels ---> */

    const Guilds = client.guilds.cache.map(guild => guild.id);

    setInterval(() => {

      Guilds.forEach(async (guild) => {

        // link

        const link = await db.get(`link_${guild}`);

        if (link) {
          let res = await fetch(link);
          const body = await res.json();

          // status

          const statusChannelID = await db.get(`statusChannelID_${guild}`);

          if (statusChannelID) {
            if (!res) {
              let statusChannelName = '❌ㅣStatus: Offline';
              client.channels.cache.get(statusChannelID).setName(statusChannelName);
            } else {
              let statusChannelName = (body.online ? '✅ㅣStatus: Online' : '❌ㅣStatus: Offline');
              client.channels.resolve(statusChannelID).setName(statusChannelName).catch(console.error)
            };
          };

          // players

          const playersChannelID = await db.get(`playersChannelID_${guild}`);

          if (playersChannelID) {

            const amount = body.players.now;
            let rest = amount % 10;

            let players;
            if (amount === 1) players = 'osoba'
            else if (rest < 2 || rest > 4) players = 'osób'
            else if (rest > 1 || rest < 5) players = 'osoby'

            const playersChannelName = `👥ㅣW grze: ${amount} ${players}`;
            client.channels.resolve(playersChannelID).setName(playersChannelName);
          };

        }
      });

    }, ms(config.updateInterval));

  }
};