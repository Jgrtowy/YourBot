module.exports = { 
     category: "dev",
     description: "delete command",
     slash: true,
     testOnly: true,
     options: [
          {
               name: "id",
               description: "idk",
               required: true,
               type: 4,
          }
     ],
	ownerOnly: true,

     callback: async ({args, client})=>{
          client.application.commands.fetch(parseInt(args[0])) // id of your command
          .then( (command) => {
               console.log(`Fetched command ${command.name}`)
               // further delete it like so:
               command.delete()
               console.log(`Deleted command ${command.name}`)
          }).catch(console.error);
     }
}