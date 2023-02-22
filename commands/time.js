const {time} = require("discord.js");
module.exports = {
     category: "main",
     description: "check the time",
     slash: true,
     testOnly: true,
     options: [
          {
               name: "timezone",
               description: "Type in your timezone f.e. -6; +2; or 0 for UTC",
               required: true,
               type: 3
          },
     ],
     callback: async ({interaction, args})=>{
          const date = new Date();
          const timezone = args[0];
          let gmt;
          try{
               gmt = timezone.replace('+', '');
          }catch (err){
               try{
                    gmt = timezone.replace('-', '');
               }catch (err){
                    console.log(err)
               }
               console.log(err)
          }
          let hrs
          if(timezone.startsWith("+")){
               hrs = date.getUTCHours() - timezone;
          }

          return `It is \`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC\` test: ${gmt}`
     }
}