const sendError = require("../addons/sendError")
const { ActivityType } = require("discord.js")

module.exports = async (instance, client) => {
     try {
          client.user.setStatus("idle")
          client.user.setPresence({
               activities: [{ name: "darksouls", type: ActivityType.Playing }],
          })
     } catch (error) {
          sendError(error)
     }
}
