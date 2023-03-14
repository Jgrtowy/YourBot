const { CommandType } = require("wokcommands")
const axios = require("axios")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const sendError = require("../addons/sendError")
module.exports = {
     description: "Get picture of cute doggo",
     type: CommandType.SLASH,
     testOnly: true,
     options: [
          {
               name: "breed",
               required: false,
               description: "Type in breed of dog you want to see",
               type: ApplicationCommandOptionType.String,
          },
     ],
     callback: async ({ interaction, args }) => {
          try {
               const breed = args[0] || 0
               if (interaction) {
                    if (breed === 0) {
                         const startTime = performance.now()
                         const request = await axios.get(
                              "https://dog.ceo/api/breeds/image/random"
                         )
                         const image = await request.data.message
                         const embed = new EmbedBuilder()
                              .setTitle(`Here's great pic of doggo!`)
                              .setImage(image)
                              .setFooter({
                                   text: `Request took: ${(
                                        (performance.now() - startTime) /
                                        1000
                                   ).toFixed(2)}s`,
                              })
                         interaction.reply({
                              embeds: [embed],
                         })
                    } else {
                         const startTime = performance.now()
                         const request = await axios.get(
                              `https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`
                         )
                         const image = await request.data.message
                         const embed = new EmbedBuilder()
                              .setTitle(`Here's great pic of doggo!`)
                              .setImage(image)
                              .setFooter({
                                   text: `Request took: ${(
                                        (performance.now() - startTime) /
                                        1000
                                   ).toFixed(2)}s`,
                              })
                         interaction.reply({
                              embeds: [embed],
                         })
                    }
               }
          } catch (error) {
               if (interaction) {
                    interaction.reply({
                         content: `> Error ocurred, please try again`,
                         ephemeral: true,
                    })
                    sendError(error)
               }
          }
     },
}
