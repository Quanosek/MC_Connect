/* <--- Import ---> */

const { MessageEmbed } = require('discord.js');
const clr = require('colors');

const config = require('../config.json');
const realDate = require('../functions/realDate.js')


/* <--- Event ---> */

module.exports = {
    name: 'guildCreate',

    async execute(client, guild) {

        /* <--- create log ---> */

        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${guild.name}, ${guild.id}\n>> Bot ` + clr.brightGreen(`joined`) + ` to the server!`);

        /* <--- welcome message ---> */

        let channelToSend;

        guild.channels.cache.forEach(channel => {
            if (
                channel.type === 'GUILD_TEXT' &&
                channel.permissionsFor(guild.me).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])
            ) channelToSend = channel;
        });

        if (channelToSend) {

            return channelToSend.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color1)
                    .setThumbnail(config.icon)
                    .setTitle('😄 | Cieszę się, że tu jestem!')
                    .setDescription(`
Jestem **${config.name}**, czyli niezbędny bot, do monitorowania aktywności na wybranym serwerze Minecraft przez Discorda!  Obsługuje automatycznie odświeżane kanały głosowe (statystyki) oraz wszystkie niezbędne informacje o skonfigurowanym serwerze.

Użyj komendy \`${config.prefix}help\` aby uzyskać więcej informacji!
        `)
                    .setFooter(`Bot stworzony przez: ${config.author}`)
                    .setTimestamp()
                ]
            }).catch(err => {
                console.error(`> ` + clr.brightCyan(`[${realDate()}]`) + ` On guildCreate: ` + clr.Red(`Failed to create welcome-message (code ${err.code})`) + `.`);
            });

        };

    }
};