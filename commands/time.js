module.exports = {
     category: "main",
     description: "check the utc time, that's it",
     slash: true,
     testOnly: true,
     callback: async ({interaction, args})=>{
          const date = new Date();
          return `It is \`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC\``
     }
}