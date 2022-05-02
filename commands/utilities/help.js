/** IMPORT */

require('dotenv').config();
const { NAME, ICON, AUTHOR_NAME, AUTHOR_NICK, AUTHOR_HASH, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** HELP COMMAND */

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Wiadomość informacyjna',

    async run(client, prefix, msg, args) {

        autoDelete(msg, 20);

        return msg.reply({ // send
            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem botem ${NAME}!**`)
                .setDescription(`
Niezbędny bot, do monitorowania aktywności na wybranym serwerze Minecraft przez Discorda! Obsługuje automatycznie odświeżane kanały głosowe (statystyki) oraz wszystkie niezbędne informacje o skonfigurowanym serwerze.

** ● Komendy:**
\`${prefix}stats\` - informacje o połączonym serwerze Minecraft
\`${prefix}invite\` - zaproszenie bota
\`${prefix}ping\` - test pingu bota

** ● Administracja:**
\`${prefix}update\` - wymuszenie odświeżenia ustawionych kanałów głosowych
\`${prefix}config\` - konfiguracja statystyk serwera MC
\`${prefix}delete\` - usuwanie statystyk serwera MC
\`${prefix}reload\` - odświeżenie wszystkich komend bota (globalnie!)

** ● Informacje dodatkowe:**
Wszystkie komendy obsługują również skróty np. zamiast pisać \`${prefix}ping\`, równie dobrze możesz wpisać: \`${prefix}p\` itp..
                `)
                .setFooter({ text: `Autor bota: ${AUTHOR_NAME} (${AUTHOR_NICK}#${AUTHOR_HASH})` })
            ],
        }).then(msg => autoDelete(msg, 20));

    },
};