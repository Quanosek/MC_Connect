/* <--- Import ---> */

const { MessageEmbed } = require('discord.js');

const config = require('../config.json');
const msgAutoDelete = require('../functions/msgAutoDelete.js')


/* <--- Event ---> */

module.exports = {
    name: 'messageCreate',

    async execute(client, msg) {

        if (!msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) return;

        /* <--- on mention reply ---> */

        const mentionRegex = new RegExp(`^<@!?(${client.user.id})>( |)$`, 'gi');

        if (msg.content.match(mentionRegex)) {

            msg.react('✅');
            msgAutoDelete(msg);

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color1)
                    .setTitle(`Mój prefix to : \`${config.prefix}\``)
                    .setDescription(`Użyj komendy \`${config.prefix}help\` aby uzyskać więcej informacji!`)
                ]
            }).then(msg => msgAutoDelete(msg));
        };

        /* <--- command-build ---> */

        msg.content = msg.content.toLowerCase();

        if (!msg.content.startsWith(config.prefix) ||
            msg.author.bot ||
            msg.channel.type === 'dm'
        ) return;

        const args = msg.content
            .slice(config.prefix.length)
            .trim()
            .split(/ +/);
        const commandName = args.shift();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        /* <--- no-permission ---> */

        if (!msg.channel.permissionsFor(msg.guild.me).has('MANAGE_MESSAGES')) {

            msg.react('❌');

            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.color_err)
                    .setDescription(`
${config.emoji_stop} | **Nie mam uprawnień** do zarządzania wiadomościami na tym kanale! Skontaktuj się z administracją serwera.
          `)
                ]
            });

        };

        /* <--- command-run ---> */

        command.run(client, msg, args)
            .catch(err => {

                return msg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(config.color_err)
                        .setDescription(`${config.emoji_stop} | ${err}`)
                    ]
                }).then(msg => msgAutoDelete(msg, 20));

            });

    }
};