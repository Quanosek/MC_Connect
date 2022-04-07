/* <--- Import ---> */

const { MessageEmbed } = require('discord.js');

const config = require('../config.json');
const msgAutoDelete = require('../functions/msgAutoDelete.js')


/* <--- Command ---> */

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'pomoc wszelaka!',

    async run(client, msg, args) {

        /* <--- command ---> */

        msg.react('✅');
        msgAutoDelete(msg, 60);

        return msg.channel.send({
            embeds: [new MessageEmbed()
                .setColor(config.color1)
                .setThumbnail(config.icon)
                .setTitle(`Hej, jestem ${config.name}!`)
                .setDescription(`
Niezbędny bot, do monitorowania aktywności na wybranym serwerze Minecraft przez Discorda! Obsługuje automatycznie odświeżane kanały głosowe (statystyki) oraz wszystkie niezbędne informacje o skonfigurowanym serwerze.

** ● Komendy:**
\`${config.prefix}stats\` - informacje o połączonym serwerze Minecraft
\`${config.prefix}invite\` - zaproszenie bota
\`${config.prefix}ping\` - test pingu bota

** ● Administracja:**
\`${config.prefix}update\` - wymuszenie odświeżenia ustawionych kanałów głosowych
\`${config.prefix}config\` - konfiguracja statystyk serwera MC
\`${config.prefix}delete\` - usuwanie statystyk serwera MC
\`${config.prefix}reload\` - odświeżenie wszystkich komend bota (globalnie!)

** ● Informacje dodatkowe:**
Wszystkie komendy obsługują również skróty np. zamiast pisać \`${config.prefix}ping\`, równie dobrze możesz wpisać: \`${config.prefix}p\` itp..
        `)
                .setFooter(`Bot stworzony przez: ${config.author}`)
                .setTimestamp()
            ]
        }).then(msg => msgAutoDelete(msg, 60));

    }
};