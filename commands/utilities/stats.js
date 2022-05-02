/** IMPORT */

const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

const config = require('../../config.json');
const autoDelete = require('../../functions/autoDelete.js');
const schema = require('../../schemas/guilds.js');

/** STATS COMMAND */

module.exports = {
    name: 'stats',
    aliases: ['stat', 's', 'list', 'l'],
    description: 'informacje o połączonym serwerze Minecraft',

    async run(client, prefix, msg, args) {

        const db = await schema.findOne({ guildId: msg.guild.id }); // database

        /* <--- data-base ---> */

        const serverIP = await db.get(`serverIP_${msg.guild.id}`);
        const link = await db.get(`link_${msg.guild.id}`);

        if (!(serverIP || link)) {
            msg.react('❌');
            msgAutoDelete(msg);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color_err)
                    .setDescription(`${config.emoji_stop} | Nie skonfigurowano żadnego serwera Minecraft!`)
                ]
            }).then(msg => msgAutoDelete(msg));
        };

        /* <--- command ---> */

        //security

        const res = await fetch(link)
        const body = await res.json()
        const amount = body.players.now;

        if (body.status === 'error') {
            msg.react('❌');
            msgAutoDelete(msg, 15);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color_err)
                    .setDescription(`
${config.emoji_stop} | Podano zły adres IP serwera Minecraft!
Użyj jeszcze raz komendy: \`mc!config ip <adres ip>\`
          `)
                ]
            }).then(msg => msgAutoDelete(msg, 15));
        };

        // command

        msg.react('✅');
        msgAutoDelete(msg, 30);

        const embed = new MessageEmbed()
            .setColor(config.color1)
            .setTitle(`📊 | Statystyki serwera Minecraft:`)
            .addFields({ name: ' ●  IP:', value: `**${serverIP}**` }, { name: ' ●  Wersja:', value: body.server.name }, { name: ' ●  Status:', value: (body.online ? `Online` : `Offline`) }, { name: ' ●  W grze:', value: `**${amount}** / ${body.players.max} osób` })
            .setFooter(`Bot stworzony przez: ${config.author}`)
            .setTimestamp()

        if (body.players.sample) {

            nicknames = body.players.sample.map(
                player => `${player.name}`
            ).join(', ');

            const listedPlayers = body.players.sample.length

            if (listedPlayers < amount && nicknames) {
                nicknames += `... **i ${amount - listedPlayers} więcej!**`
            };

            if (nicknames) {
                embed.addField(' ●  Lista osób:', nicknames);
            };

        };

        return msg.channel.send({ embeds: [embed] })
            .then(msg => msgAutoDelete(msg, 30));

    }
};