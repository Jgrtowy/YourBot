const { CommandType } = require("wokcommands")
const axios = require("axios")
const sendError = require("../addons/sendError")
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")

module.exports = {
     description: "Get info about user",
     type: CommandType.SLASH,
     testOnly: true,
     options: [
          {
               name: "user",
               description: "Provide user",
               type: ApplicationCommandOptionType.User,
               required: true,
          },
     ],
     callback: async ({ interaction, args, message }) => {
          try {
               if (interaction) {
                    const startTime = performance.now()

                    const userId = args[0]
                    const guild = interaction.guild
                    const member = await guild.members.fetch(userId)
                    const embed = new EmbedBuilder()
                         .setTitle(`**${member.user.username}**`)
                         .setImage(member.user.displayAvatarURL())
                         .addFields([
                              {
                                   name: "Joined at",
                                   value: convertDate(member.joinedAt),
                                   inline: true,
                              },
                              {
                                   name: "Created at",
                                   value: convertDate(member.user.createdAt),
                                   inline: true,
                              },
                              {
                                   name: "Roles",
                                   value: member.roles.cache

                                        .map((role) => {
                                             return role.name
                                        })
                                        .join(", "),
                                   inline: true,
                              },
                         ])
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
                         ephemeral: true,
                    })
                    sendError(error)
               }
          }
     },
}

const convertDate = (date) => {
     const newDate = new Date(date)
     return `${newDate.getDate()}/${
          newDate.getMonth() + 1
     }/${newDate.getFullYear()}`
}
