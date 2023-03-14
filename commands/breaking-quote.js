const { CommandType } = require("wokcommands")
const axios = require("axios")
const { EmbedBuilder } = require("discord.js")
const sendError = require("../addons/sendError")
module.exports = {
     description: "Get random quote from Breaking Bad",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({ interaction }) => {
          try {
               const startTime = performance.now()
               const request = await axios.get(
                    "https://api.breakingbadquotes.xyz/v1/quotes"
               )
               const response = await request.data
               const responseEmbed = new EmbedBuilder()
                    .setTitle(`Here's your quote:`)
                    .setDescription(
                         `*${response[0].quote}*\n\nSaid by **${response[0].author}**`
                    )
                    .setFooter({
                         text: `Request took: ${(
                              (performance.now() - startTime) /
                              1000
                         ).toFixed(2)}s`,
                    })
                    .setColor("Random")
               if (interaction) {
                    interaction.reply({
                         embeds: [responseEmbed],
                    })
               }
          } catch (error) {
               if (interaction) {
                    interaction.reply({
                         content: `> Something's failed... Try again later`,
                    })
                    sendError(error)
               }
          }
     },
}
