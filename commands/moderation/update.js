/** IMPORT */

const { Permissions, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

const config = require('../../config.json');
const autoDelete = require('../../functions/autoDelete.js');
const schema = require('../../schemas/guilds.js');

/** UPDATE COMMAND */

module.exports = {
    name: 'update',
    aliases: ['u'],
    description: 'wymuszenie odświeżenia ustawionych kanałów głosowych',
    permissions: ['MANAGE_MESSAGES'],

    async run(client, prefix, msg, args) {

        const db = await schema.findOne({ guildId: msg.guild.id }); // database

        // link (security)

        const link = await db.get(`link_${msg.guild.id}`);

        if (!link) {
            msg.react('❌');
            msgAutoDelete(msg);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color_err)
                    .setDescription(`${config.emoji_stop} | Nie skonfigurowano żadnego serwera Minecraft!`)
                ]
            }).then(msg => msgAutoDelete(msg));

        } else {

            msg.react('✅');
            msgAutoDelete(msg);

            let res = await fetch(link);
            const body = await res.json();

            // status

            const statusChannelID = await db.get(`statusChannelID_${msg.guild.id}`);

            if (statusChannelID) {
                if (!res) {
                    let statusChannelName = '❌ㅣStatus: Offline';
                    client.channels.cache.get(statusChannelID).setName(statusChannelName);
                } else {
                    let statusChannelName = (body.online ? '✅ㅣStatus: Online' : '❌ㅣStatus: Offline');
                    client.channels.resolve(statusChannelID).setName(statusChannelName);
                };
            };

            // players

            const playersChannelID = await db.get(`playersChannelID_${msg.guild.id}`);

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

        };

        return msg.channel.send({
            embeds: [new MessageEmbed()
                .setColor(config.color1)
                .setDescription('🔃 | Odświeżono wszystkie skonfigurowane kanały głosowe.')
            ]
        }).then(msg => msgAutoDelete(msg));

    }
};