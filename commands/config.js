/* <--- Import ---> */

const { Permissions, MessageEmbed } = require('discord.js');
const clr = require('colors');

const config = require('../config.json');
const msgAutoDelete = require('../functions/msgAutoDelete.js')
const realDate = require('../functions/realDate.js')

const Database = require('@replit/database')
const db = new Database()


/* <--- Command ---> */

module.exports = {
    name: 'config',
    aliases: ['c'],
    description: 'konfiguracja statystyk serwera MC',

    async run(client, msg, args) {

        /* <--- admin ---> */

        if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            msg.react('❌');
            msgAutoDelete(msg);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color_err)
                    .setDescription(`${config.emoji_stop} | Nie masz uprawnień do użycia tej komendy!`)
                ]
            }).then(msg => msgAutoDelete(msg));
        };

        /* <--- serverIP ---> */

        if (args[0] === 'serverip' || args[0] === 'ip') {

            // security

            if (!args[1]) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Musisz jeszcze podać adres IP serwera Minecraft, który chcesz podłączyć!`)
                    ]
                }).then(msg => msgAutoDelete(msg));
            };

            // command

            let url = new URL('https://mcapi.us/server/status');
            url.searchParams.append('ip', args[1])
            let link = url.href

            msg.react('✅');
            msgAutoDelete(msg, 15);

            db.set(`serverIP_${msg.guild.id}`, args[1]);
            db.set(`link_${msg.guild.id}`, link);

            console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n>> ` + clr.brightGreen(`Added`) + ` new serverIP to database: ${args[1]}`);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color1)
                    .setDescription(`⚙️ | Ustawiono adres IP serwera Minecraft:\n\`${args[1]}\``)
                ]
            }).then(msg => msgAutoDelete(msg, 15));

        };

        /* <--- statusChannel ---> */

        if (args[0] === 'status' || args[0] === 's') {

            // security

            if (!args[1]) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Musisz jeszcze podać numer ID kanału, który chcesz podłączyć!`)
                    ]
                }).then(msg => msgAutoDelete(msg));
            };

            const channelObject = msg.guild.channels.cache.get(args[1]);

            if (!(!isNaN(args[1]) && args[1].length == 18 && channelObject.type === 'GUILD_VOICE')) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Podaj prawidłowy numer ID kanału głosowego!`)
                    ]
                }).then(msg => {
                    msgAutoDelete(msg);
                });
            };

            if (!channelObject.permissionsFor(msg.guild.me).has(['MANAGE_CHANNELS'])) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Nie mam uprawnień do zarządzania tym kanałem!`)
                    ]
                }).then(msg => msgAutoDelete(msg));
            };

            // command

            msg.react('✅');
            msgAutoDelete(msg, 15);

            db.set(`statusChannelID_${msg.guild.id}`, args[1]);

            console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n>> ` + clr.brightGreen(`Added`) + ` new statusChannelID to database.`);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color1)
                    .setDescription(`⚙️ | Ustawiono statystykę "Status":\n\`ID: ${args[1]}\``)
                ]
            }).then(msg => msgAutoDelete(msg, 15));

        };

        /* <--- playersChannel ---> */

        if (args[0] === 'players' || args[0] === 'p') {

            // security

            if (!args[1]) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Musisz jeszcze podać numer ID kanału, który chcesz podłączyć!`)
                    ]
                }).then(msg => msgAutoDelete(msg));
            };

            const channelObject = msg.guild.channels.cache.get(args[1]);

            if (!(!isNaN(args[1]) && args[1].length == 18 && channelObject.type === 'GUILD_VOICE')) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Podaj prawidłowy numer ID kanału głosowego!`)
                    ]
                }).then(msg => msgAutoDelete(msg));
            };

            if (!channelObject.permissionsFor(msg.guild.me).has(['MANAGE_CHANNELS'])) {
                msg.react('❌');
                msgAutoDelete(msg);

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | Nie mam uprawnień do zarządzania tym kanałem!`)
                    ]
                }).then(msg => msgAutoDelete(msg));
            };

            // command

            msg.react('✅');
            msgAutoDelete(msg, 15);

            db.set(`playersChannelID_${msg.guild.id}`, args[1]);

            console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n>> ` + clr.brightGreen(`Added`) + ` new playersChannelID to database.`);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color1)
                    .setDescription(`⚙️ | Ustawiono statystykę "W grze":\n\`ID: ${args[1]}\``)
                ]
            }).then(msg => msgAutoDelete(msg, 15));

        };

        /* <--- help ---> */

        msg.react('✅');
        msgAutoDelete(msg, 45);

        return msg.channel.send({
            embeds: [new MessageEmbed()
                .setColor(config.color1)
                .setTitle(`${config.emoji_config} | Menu konfiguracji`)
                .setDescription(`
Komenda pozwala na dodanie statystyk twojego serwera Minecraft do bazy danych bota. Kanały głosowe odświeżają się automatycznie co 11 minut (ograniczenia Discorda) i pozwalają być na bieżąco bez włączania gry!

** ● Komendy:**
\`${config.prefix}config ip <adres ip>\` - ustawienie adresu IP serwera Minecraft (konieczne do działania)
\`${config.prefix}config status <id kanału głosowego>\` - ustawienie statystyki "Status"
\`${config.prefix}config players <id kanału głosowego>\` - ustawienie statystyki "W grze"

** ● Informacje dodatkowe:**
Wszystkie komendy obsługują również skróty np. zamiast pisać \`${config.prefix}config\`, równie dobrze możesz wpisać: \`${config.prefix}c\` itp..
        `)
                .setFooter(`Bot stworzony przez: ${config.author}`)
                .setTimestamp()
            ]
        }).then(msg => msgAutoDelete(msg, 45));

    }
};