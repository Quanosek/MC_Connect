/* <--- Import ---> */

const { MessageEmbed } = require('discord.js');

const config = require('../config.json');
const msgAutoDelete = require('../functions/msgAutoDelete.js')


/* <--- Command ---> */

module.exports = {
    name: 'invite',
    aliases: ['i'],
    description: 'zaproszenie bota',

    async run(client, msg, args) {

        /* <--- command ---> */

        msg.react('✅');
        msgAutoDelete(msg, 15);

        return msg.channel.send({
            embeds: [new MessageEmbed()
                .setColor(config.color1)
                .setTitle('📧 | Zaproś mnie na swój serwer!')
                .setDescription(config.invite)
                .setFooter(`Bot stworzony przez: ${config.author}`)
                .setTimestamp()
            ]
        }).then(msg => msgAutoDelete(msg, 15));

    }
};