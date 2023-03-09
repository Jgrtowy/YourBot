const {CommandType} = require('wokcommands');
const axios = require('axios')
module.exports = {
     category: "Animals",
     description: "Get picture of a duck",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({interaction})=>{
          const request = await axios({
               method: 'get',
               url: 'https://random-d.uk/api/random',
               headers: {'content-type': 'application/json'}
          })
          const image = await request.data.url;
          // console.log(image);
          if(interaction){
               interaction.reply({
                    content: `${image}`
               })
          }
     }
}