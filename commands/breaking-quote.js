const {CommandType} = require('wokcommands');
const axios = require('axios');
const { EmbedBuilder } = require('@discordjs/builders');
module.exports = {
     description: "Get random quote from Breaking Bad",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ({interaction})=>{
          const request = await axios.get('https://api.breakingbadquotes.xyz/v1/quotes')
          const response = await request.data;
          const responseEmbed = new EmbedBuilder().setTitle(`Here's your quote:`).setDescription(`> **${response[0].quote}**\n\nSaid by ${response[0].author}`)
          if(interaction){
               interaction.reply({
                    embeds: [responseEmbed]
               })
          }
     }
}