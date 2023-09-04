import { Client, IntentsBitField, Partials } from 'discord.js';
import path from 'path';
import WOK, { DefaultCommands } from 'wokcommands';
import sendStartup from './addons/sendStartup';
require('dotenv').config();
sendStartup(0, 0);
const startTime = performance.now();

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.DirectMessages, IntentsBitField.Flags.MessageContent],
    partials: [Partials.Channel],
});

client.on('ready', () => {
    new WOK({
        client,
        commandsDir: path.join(__dirname, 'commands'),
        testServers: ['980813190780841984', '1040650205202227261', '1137122349066498208'],
        botOwners: ['315531146953752578', '304961013202288651'],
        mongoUri: process.env.MONGO_URI || '',
        disabledDefaultCommands: [DefaultCommands.ChannelCommand, DefaultCommands.Prefix, DefaultCommands.RequiredPerrmissions, DefaultCommands.RequiredRoles, DefaultCommands.ToggleCommand],
        events: {
            dir: path.join(__dirname, 'events'),
        },
        featuresDir: path.join(__dirname, 'features'),
    });
});

client.login(process.env.TOKEN);
const finalTime = ((performance.now() - startTime) / 1000).toFixed(2);
sendStartup(finalTime, 1);
console.log(`🎉🎉🎉 Yo(ur) bot is now running! Time: ${finalTime}s`);
