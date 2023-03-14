const { CommandType } = require("wokcommands")
const axios = require("axios")
const sendError = require("../addons/sendError")
const { EmbedBuilder } = require('discord.js')
module.exports = {
     description: "Get picture of cute fox :3",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({ interaction }) => {
          try {
               if (interaction) {
                    const startTime = performance.now();
                    const request = await axios.get("https://randomfox.ca/floof/")
                    const image = await request.data.image
                    const embed = new EmbedBuilder()
                    .setTitle(`Here's cute pic of fox!`)
                    .setImage(image)
                    .setFooter({
                         text: `Request took: ${(
                              (performance.now() - startTime) /
                              1000
                         ).toFixed(2)}s`,
                    })
                    .setColor("Random")
               interaction.reply({
                    embeds: [embed],
               })
               }
          } catch (error) {
               if (interaction) {
                    interaction.reply({
                         content: `> Error ocurred, please try again`,
                         ephemeral: true
                    })
                    sendError(error)
               }
          }
     },
}
