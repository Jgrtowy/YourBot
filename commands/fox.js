const {CommandType} = require('wokcommands');
const axios = require('axios')
module.exports = {
     description: "Get picture of cute fox :3",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({interaction})=>{
          const request = await axios.get('https://randomfox.ca/floof/')
          const image = await request.data.image;
          if(interaction){
               interaction.reply({
                    content: `${image}`
               })
          }
     }
}