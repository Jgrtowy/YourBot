const startTime = performance.now();
const path = require("path")
const WOKCommands = require("wokcommands")
const DiscordJS = require("discord.js")
const {
  IntentsBitField,
  Partials, 
} = DiscordJS
require("dotenv").config()
const axios = require("axios")

const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
})

client.on("ready", async () => {
  new WOKCommands({
    client,
    commandsDir: path.join(__dirname, "commands"),
    testServers: ["980813190780841984", "1040650205202227261"],
    botOwners: ["315531146953752578", "304961013202288651"],
    mongoUri: process.env.MONGO_URI || "",
    disabledDefaultCommands: [
      'prefix', 'language', 'command', 'requiredRole', 'requiredChannel', 'requiredPermissions'
    ],
  })
  try {
    client.user.setStatus('idle');
    client.user.setActivity({ type: 0, url: "https://twitch.tv/jgrtowy", name: 'darksouls' })
  } catch (error) {
    console.log(error);
  }
})

const darkSoulsMsg = [
  "Dark Souls? Where?",
  "D4rk S0ul5",
  "Did you mean Elden Ring?",
  "Demon Souls?",
  "Literal Moses moment",
  "Code Vein",
  "Tears of the Kingdom"
]

client.on("messageCreate", async (message) => {
  if (message.content === "darksouls") {
    const startTime = performance.now();
    let endTime;
    try {
      (async () => {
        try{
          await axios.get("https://api.saintkappa.xyz/moses/quotes/random")
          endTime = performance.now()
          sendMsg();
        }catch(err){
          console.log(err);
        }
        
      })();
      function sendMsg() {
        message.channel.send("||<:Trollface:1064487093700669521>||").then((msg) => {
          msg.edit(
            `**${darkSoulsMsg[Math.floor(Math.random() * darkSoulsMsg.length)]}**\n\`\`\`js\nClient: "${msg.createdTimestamp - message.createdTimestamp}ms"\nAPI: "${Math.floor(endTime - startTime)}ms"\`\`\`
            `
          )
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
})


client.login(process.env.TOKEN)
console.log(`🎉🎉🎉 Yo(ur) bot is now running! Time: ${((performance.now() - startTime)/1000).toFixed(2)}s`);