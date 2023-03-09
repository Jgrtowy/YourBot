const { CommandType } = require('wokcommands');
module.exports = {
     category: "main",
     description: "check the utc time, that's it",
     type: CommandType.SLASH,
     testOnly: true,
     callback: async ()=>{
          const date = new Date();
          return `It is \`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC\``
     }
}