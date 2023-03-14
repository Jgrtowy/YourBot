const { WebhookClient, EmbedBuilder } = require('discord.js')
require("dotenv").config()


module.exports = (error) => {
     const webhook = new WebhookClient({url: process.env.ERRORWH})
     const embed = new EmbedBuilder().setTitle(`Error on Yo(ur) bot occured!`).setDescription(`**Here's error message:**\n\`\`\`js\n${error}\`\`\``).setTimestamp().setColor('Red')
     webhook.send({
          embeds: [embed],
     })
}