const {CommandType} = require('wokcommands');
const axios = require('axios');
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
     description: "Snip your url blazingly fast",
     type: CommandType.SLASH,
     testOnly: true,
     options: [
          {
               name: 'url',
               description: 'Provide URL to snip',
               type: ApplicationCommandOptionType.String,
               required: true,
          }
     ],
     callback: async ({interaction, args})=>{
          
          
          if(interaction){
               if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(args[0]) || /(?:https?:\/\/)?snip\.gay\/?.*/.test(args[0])) return {
                    content: `> Your URL is invalid`,
                    ephemeral: true,
               }
               const request = await axios.post('https://snip.gay/api/new', { "url": args[0] }, {headers: {"Content-Type": "application/json"}});
               return{
                    content: `> Here's your new URL: ${request.data.snipUrl} created from \`${args[0]}\``,
                    // ephemeral: true,
               }
          }
     }
}