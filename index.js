/* <--- Import ---> */

const fs = require('fs');
const clr = require('colors');

const config = require('./config.json');
const website = require('./functions/website.js')
const realDate = require('./functions/realDate.js')


/* <--- Start ---> */

console.log(`> ` + clr.brightCyan(`[${realDate()}]`) + ` ${config.name} starting up...`);
website();


/* <--- Client---> */

const { Client, Intents, Collection } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({
    shards: 'auto',
    restTimeOffset: 0,
    intents
});


/* <--- Handlers ---> */

// commands

client.commands = new Collection();

fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });

// events

client.events = new Collection();

fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
    });


/* <--- Token ---> */

client.login(process.env['TOKEN']);