module.exports = { 
     category: "lol",
     description: "delete command",
     slash: true,
     testOnly: true,
     options: [
          {
               name: "a",
               description: "idk",
               required: true,
               type: 3,
          }
     ],
     slash: true,
	ownerOnly: true,

     callback: async ({args, client})=>{
          return `Deleted ${args[0]}`
          // return "Hello!"
     }
}