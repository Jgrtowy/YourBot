const { CommandType } = require("wokcommands")
const axios = require("axios")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const sendError = require("../addons/sendError")
module.exports = {
     type: CommandType.SLASH,
     testOnly: true,
     description: "Get picture of cute dog or see list of avaiable breeds",
     options: [
          {
               name: "picture",
               description: "Get picture of cute doggo",
               type: ApplicationCommandOptionType.Subcommand,
               options: [
                    {
                         name: "breed",
                         required: false,
                         description: "Type in breed of dog you want to see",
                         type: ApplicationCommandOptionType.String,
                    },
               ],
          },
          {
               required: false,
               name: "list",
               description: "See list of all breeds avaiable",
               type: ApplicationCommandOptionType.Subcommand,
          },
     ],
     callback: async ({ interaction }) => {
          try {
               const command = interaction.options._subcommand;
               const args = interaction.options._hoistedOptions;
               switch (command) {
                    case "list":
                         const request = await axios.get('https://dog.ceo/api/breeds/list/all')
                         const response = await request.data.message
                         const embed = new EmbedBuilder().setTitle(`🚧 Command under construction`).setDescription(`
                              Meanwhile you can check the list here: <https://dog.ceo/api/breeds/list/all>.
                              If the dog has subname in it's name for example **"australian": ["shepherd"]** you should type the name like this: \`name/subname\` for example \`australian/shepherd\`
                         `)
                         interaction.reply({
                              embeds: [embed],
                              ephemeral: true,
                         })
                         break
                    case "picture":
                         if (interaction) {
                              const breed = args[0]?.value || 0
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
                                                  (performance.now() -
                                                       startTime) /
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
                                                  (performance.now() -
                                                       startTime) /
                                                  1000
                                             ).toFixed(2)}s`,
                                        })
                                   interaction.reply({
                                        embeds: [embed],
                                   })
                              }
                         }
                         break;
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
