const { CommandType } = require("wokcommands")
const axios = require("axios")
module.exports = {
     description: "Get picture of cute fox :3",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({ interaction }) => {
          try {
               const request = await axios.get("https://randomfox.ca/floof/")
               const image = await request.data.image
               if (interaction) {
                    interaction.reply({
                         content: `${image}`,
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
