/* <--- Import ---> */

const { Permissions, MessageEmbed } = require('discord.js');

const config = require('../config.json');
const msgAutoDelete = require('../functions/msgAutoDelete.js')

const Database = require('@replit/database')
const db = new Database()


/* <--- Command ---> */

module.exports = {
  name: 'delete',
  aliases: ['d'],
  description: 'usuwanie statystyk serwera MC',

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

      if (!(await db.get(`serverIP_${msg.guild.id}`) && await db.get(`link_${msg.guild.id}`))) {

        // security

        msg.react('❌');
        msgAutoDelete(msg);

        return msg.channel.send({
          embeds: [new MessageEmbed()
            .setColor(config.color_err)
            .setDescription(`${config.emoji_stop} | Nie znaleziono adresu IP serwera Minecraft!`)
          ]
        }).then(msg => msgAutoDelete(msg));

      } else {

        // command

        msg.react('✅');
        msgAutoDelete(msg);

        await db.delete(`serverIP_${msg.guild.id}`);
        await db.delete(`link_${msg.guild.id}`);

        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n>> ` + clr.brightRed(`Deleted`) + ` serverIP & link from database.`);

        return msg.channel.send({
          embeds: [new MessageEmbed()
            .setColor(config.color1)
            .setDescription('⚙️ | Usunięto adres IP serwera Minecraft.')
          ]
        }).then(msg => msgAutoDelete(msg));

      }
    };

    /* <--- statusChannel ---> */

    if (args[0] === 'status' || args[0] === 's') {

      if (!(await db.get(`statusChannelID_${msg.guild.id}`))) {

        // security

        msg.react('❌');
        msgAutoDelete(msg);

        return msg.channel.send({
          embeds: [new MessageEmbed()
            .setColor(config.color_err)
            .setDescription(`${config.emoji_stop} | Nie znaleziono numeru ID kanału!`)
          ]
        }).then(msg => msgAutoDelete(msg));

      } else {

        // command

        msg.react('✅');
        msgAutoDelete(msg);

        db.delete(`statusChannelID_${msg.guild.id}`);

        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n>> ` + clr.brightRed(`Deleted`) + ` statusChannelID from database.`);

        return msg.channel.send({
          embeds: [new MessageEmbed()
            .setColor(config.color1)
            .setDescription('⚙️ | Usunięto statystykę "Status".')
          ]
        }).then(msg => msgAutoDelete(msg));

      }
    };

    /* <--- playserChannel ---> */

    if (args[0] === 'players' || args[0] === 'p') {

      if (!(await db.get(`statusChannelID_${msg.guild.id}`))) {

        // security

        msg.react('❌');
        msgAutoDelete(msg);

        db.delete(`playersChannelID_${msg.guild.id}`);

        return msg.channel.send({
          embeds: [new MessageEmbed()
            .setColor(config.color_err)
            .setDescription(`${config.emoji_stop} | Nie znaleziono numeru ID kanału!`)
          ]
        }).then(msg => msgAutoDelete(msg));

      } else {

        // command

        msg.react('✅');
        msgAutoDelete(msg);

        db.delete(`playersChannelID_${msg.guild.id}`);

        console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` Guild: ${msg.guild.name}, ${msg.guild.id}\n>> ` + clr.brightRed(`Deleted`) + ` playersChannelID from database.`);

        return msg.channel.send({
          embeds: [new MessageEmbed()
            .setColor(config.color1)
            .setDescription('⚙️ | Usunięto statystykę "W grze".')
          ]
        }).then(msg => msgAutoDelete(msg));
      };

    }

    /* <--- help ---> */

    msg.react('✅');
    msgAutoDelete(msg, 45);

    return msg.channel.send({
      embeds: [new MessageEmbed()
        .setColor(config.color1)
        .setTitle(`${config.emoji_config} | Menu konfiguracji (usuwanie)`)
        .setDescription(`
Komenda pozwala na usunięcie statystyk twojego serwera Minecraft z bazy danych bota.

** ● Komendy:**
\`${config.prefix}delete ip\` - usunięcie adresu IP serwera Minecraft (konieczne do działania)
\`${config.prefix}delete status\` - usunięcie statystyki "Status"
\`${config.prefix}delete players\` - usunięcie statystyki "W grze"

** ● Informacje dodatkowe:**
Wszystkie komendy obsługują również skróty np. zamiast pisać \`${config.prefix}delete\`, równie dobrze możesz wpisać: \`${config.prefix}d\` itp..
        `)
        .setFooter(`Bot stworzony przez: ${config.author}`)
        .setTimestamp()
      ]
    }).then(msg => msgAutoDelete(msg, 45));

  }
};