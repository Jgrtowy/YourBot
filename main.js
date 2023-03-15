const startTime = performance.now();
const path = require("path")
const WOKCommands = require("wokcommands")
const {Client, IntentsBitField, Partials} = require("discord.js")
require("dotenv").config()
const sendStartup = require('./addons/sendStartup')
sendStartup(0, 0)

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
})

client.on("ready", () => {
  new WOKCommands({
    client,
    commandsDir: path.join(__dirname, "commands"),
    testServers: ["980813190780841984", "1040650205202227261"],
    botOwners: ["315531146953752578", "304961013202288651"],
    mongoUri: process.env.MONGO_URI || "",
    disabledDefaultCommands: [
      'prefix', 'language', 'command', 'requiredRole', 'requiredChannel', 'requiredPermissions'
    ],
    events: {
      dir: path.join(__dirname, 'events')
    },
    featuresDir: path.join(__dirname, 'features')
  })
})

client.login(process.env.TOKEN)
const finalTime = ((performance.now() - startTime)/1000).toFixed(2)
sendStartup(finalTime, 1)
console.log(`🎉🎉🎉 Yo(ur) bot is now running! Time: ${finalTime}s`);