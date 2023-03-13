const { CommandType } = require("wokcommands")
const axios = require("axios")
const { EmbedBuilder } = require("@discordjs/builders")
module.exports = {
     description: "Get random useless fact",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({ interaction }) => {
          try {
               const request = await axios.get(
                    "https://uselessfacts.jsph.pl/api/v2/facts/random"
               )
               const response = await request.data
               const responseEmbed = new EmbedBuilder()
                    .setTitle(`Here's your random fact:`)
                    .setDescription(`> **${response.text}**`)
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
               }
          }
     },
}
