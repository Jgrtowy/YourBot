const path = require("path")
const WOKCommands = require("wokcommands")
const DiscordJS = require("discord.js")
const {
  IntentsBitField,
  ActivityType,
  EmbedBuilder,
  WebhookClient,
  Guild,
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
  })
  try {
    client.user.setStatus('idle');
  } catch (error) {
    console.log(error);
  }
})

// webhook

// const contextEmbed = new EmbedBuilder()
//   .setColor(0x8a00c2)
//   .setTitle(":wave: Greetings User!")
//   .setDescription(
//     `> My name is <@315531146953752578> and I would like to welcome \n you to **The Moses Cult!**\n
// 		> So, everyday at <t:22500:t> at <#980813191556780064> \n channel random <@389021335285661707> quote will be sent!
// 		The daily quote message contains a ping. Dont like pings? You can toggle them in <#980839919972921374>. \n
// 		> If you're missing the context on why you got invited \n here and don't know what this is all about, here is a quick introduction to our community:\n
// 		> Gino/**Mojżesz**/*Moses* <:mosesBlow:985963807740407870> sometimes says \nsome stupid shit, so some dumbass who clearly has too much free time decided to make a discord bot that would store all of Moses' stupid *"quotes"* in a database.
// 		`
//   )
//   .setThumbnail(
//     "https://cdn.discordapp.com/emojis/985963113859919962.gif?size=96&quality=lossless"
//   )

// const rulesEmbed = new EmbedBuilder()
//   .setColor(0xb100cd)
//   .setTitle("Anyways, here are few rules that you need to follow")
//   .setDescription(`> 1. Be Respectful. Show respect to all members of \n our community.\n
// 		> 2. Follow Discord ToS. \n
// 		> 3. No spam or self-promotion (server invites, \n advertisements, etc) without permission from a staff member. This includes DMing fellow members. \n
// 		> 4. No NSFW content on any of channels. \n
// 		> 5. If you see something against the rules or something \n that makes you feel unsafe, let staff know by creating ticket on <#984408577219383307>. \n
// 		> 6. Not knowing the rules does not exempt from complying \n with them. \n
// 		> 7. Server staff can ban you without giving reason. \n
// 		> 8. Administrators can change rules without notifying \n any of server members.
// 		`)
// const rolesEmbed = new EmbedBuilder()
//   .setColor(0xca5cdd)
//   .setTitle("Also, these are the roles").setDescription(`> **Main roles**
// 	**<@&981600802248482937>** - Authority of this project, without him this server wouldn't even exist
// 	**<@&982392173951606795>** - People responisble for creation of <@980863032504758292>, they also review tickets created at <#984408577219383307>, ping them at own risk

// 	> **Staff roles**
// 	**<@&986995435136745534>** - Moderation guys, ping online member if something bad is happening on this server
// 	**<@&1018223461207908452>** - Smaller version of <@&986995435136745534>, they still have permissions to moderate our community
// 	**<@&1011997555653103636>** - Literally bots, they help us automate some of moderation stuff

// 	> **Member roles**
// 	**<@&982177545803943966>** - Cool members who support us with boosts :heart:
// 	**<@&1037464914589122602>** - Normies with really small perms
// 	**<@&980815178813820988>** and **<@&980814138869698641>** - Everyone, only diffrence is that first role hasS ping at daily quotes
// 	`)

// const changelogEmbed = new EmbedBuilder()
//   .setColor(0xb100cd)
//   .setTitle(`We've added literally LOTS of stuff so...`)
//   .setDescription(
//     `
// 		> Server changes
// 		- Added <#986956217563897886> channel
// 		- Deleted old "moses-pics" channel

// 		> Bot changes
// 		- Changed embed style of daily quotes
// 		- Now you can add Moses pictures on <#984114613106933770> with "/moses pics" commands (more info on <#1047230917078429816>)
// 		- Tweaked overall functioning of bot
// 		`
//   )
//   .setTimestamp()
//   .setFooter({
//     text: "regards!",
//     iconURL:
//       "https://cdn.discordapp.com/attachments/1040650206158532672/1047559358508171325/unknown.png",
//   })

// client.on("messageCreate", async (message) => {
//   if (message.content === "sendrules" && !message.author.bot) {
//     try {
//       // message.channel.send({embeds: [rulesEmbed]})
//       webhookClient.send({
//         content: "",
//         username: "Moses Rules",
//         avatarURL:
//           "https://cdn.discordapp.com/attachments/1040650206158532672/1047531013141692436/sesom.jpg",
//         embeds: [contextEmbed, rulesEmbed, rolesEmbed],
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }
// })

// client.on("messageCreate", async (message) => {
//   if (message.content === "sendlog" && !message.author.bot) {
//     try {
//       // message.channel.send({embeds: [rulesEmbed]})
//       changelogWebhook.send({
//         content: "",
//         username: "Moses Changelog",
//         avatarURL:
//           "https://cdn.discordapp.com/attachments/1040650206158532672/1047531013141692436/sesom.jpg",
//         embeds: [changelogEmbed],
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }
// })

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
console.log("Yo(ur) bot it now running!");