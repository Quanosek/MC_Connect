/** IMPORT */

require('dotenv').config();
const { NAME, ICON, AUTHOR_NAME, AUTHOR_NICK, AUTHOR_HASH, COLOR1 } = process.env;

const { MessageEmbed } = require('discord.js');

const autoDelete = require('../../functions/autoDelete.js');

/** HELP COMMAND */

module.exports = {
    name: 'help',
    description: 'Wiadomość informacyjna',

    async run(client, interaction) {

        return interaction.reply({ // send

            embeds: [new MessageEmbed()
                .setColor(COLOR1)
                .setThumbnail(ICON)
                .setTitle(`👋 | **Hej, jestem ${NAME}!**`)
                .setDescription(`
**Więcej informacji już niedługo...**
                `)
                .setFooter({ text: `Autor bota: ${AUTHOR_NAME} (${AUTHOR_NICK}#${AUTHOR_HASH})` })
            ],

        }).then(autoDelete(interaction, 20));

    },
};