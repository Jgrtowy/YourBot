const { EmbedBuilder, Discord } = require('discord.js')

module.exports = {
     category: "main",
	description: "Create own embeds",
     options: [
          {
               name: "title",
               description: "Type in your embed title",
               required: true,
               type: 3
          },
          {
               name: "description",
               description: "Type in your embed description",
               required: false,
               type: 3
          },
          {
               name: "color",
               description: "Type in your embed color (hex)",
               required: false,
               type: 3
          },
          {
               name: "url",
               description: "Type in url you want to redirect to",
               required: false,
               type: 3
          },

     ],
     slash: true,
	ownerOnly: true,
	testOnly: true,

     callback: ({ client, interaction, args }) => {
          const title = args[0];
          const desc = args[1];
          const color = args[2];
          let url = args[3];
          

          // ifs
          if(!url==''){
               if(!url.startsWith(`https://`)){
                    url = `https://${url}/`
               }
          }

          if (interaction) {
               // interaction.reply({embeds: [generatedEmbed]});
               // interaction.reply(`Title: ${title}, desc: ${desc}`);
               // const generatedEmbed = new EmbedBuilder().setTitle(title).setDescription(desc).setColor(`0x${color.toUpperCase()}`);
               interaction.reply(`hex: ${color}, raw url: ${args[3]}, generated url: ${url}`);
          }
     },
     
}
