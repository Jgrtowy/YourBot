const {CommandType} = require('wokcommands');
const axios = require('axios');
const sendError = require("../addons/sendError")
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
     description: "Snip your url blazingly fast",
     type: CommandType.SLASH,
     testOnly: true,
     // options: [
     //      {
     //           name: 'url',
     //           description: 'Provide URL to snip',
     //           type: ApplicationCommandOptionType.String,
     //           required: true,
     //      }
     // ],
     callback: async ({interaction, args})=>{
          
          try{
               if(interaction){
                    // if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(args[0]) || /(?:https?:\/\/)?snip\.gay\/?.*/.test(args[0])) return {
                    //      content: `> Your URL is invalid`,
                    //      ephemeral: true,
                    // }
                    // const request = await axios.post('https://snip.gay/api/new', { "url": args[0] }, {headers: {"Content-Type": "application/json"}});
                    // const embed = new EmbedBuilder()
                    // .setTitle(`Here's amazing pic of duck!`)
                    // .setDescription(`**${request.data.snipUrl}** created from \`${args[0]}\``)
                    // .setFooter({
                    //      text: `Request took: ${(
                    //           (performance.now() - startTime) /
                    //           1000
                    //      ).toFixed(2)}s`,
                    // })
                    // .setColor("Random")

                    // interaction.reply({
                    //      embeds: [embed]
                    // })
                    interaction.reply({
                         content: `> Command not done yet, sorry!`,
                         ephemeral: true
                    })
               }
          }catch(error){
               if (interaction) {
                    interaction.reply({
                         content: `> Error ocurred, please try again`,
                         ephemeral: true
                    })
                    sendError(error)
               }
          }    
     }
}