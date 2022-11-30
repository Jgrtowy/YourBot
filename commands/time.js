module.exports = {
     category: "main",
     description: "check the time",
     slash: true,
     testOnly: true,
     callback: async ({interaction})=>{
          const date = new Date();
          return `It is ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
     }
}