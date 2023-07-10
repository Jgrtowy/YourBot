import { Message } from 'discord.js';

const sendError = require('../../addons/sendError');
const axios = require('axios');

export default (message: Message) => {
    if (message.content !== 'darksouls' || message.author.bot) return;
    const darkSoulsMsg: string[] = ['Dark Souls? Where?', 'D4rk S0ul5', 'Did you mean Elden Ring?', 'Demon Souls?', 'Literal Moses moment', 'Code Vein', 'Tears of the Kingdom', 'Bloodborne'];
    const startTime: number = performance.now();
    let endTime: number;
    try {
        (async () => {
            try {
                await axios.get('https://api.saintkappa.xyz/moses/quotes/random');
                endTime = performance.now();
                sendMsg();
            } catch (err) {
                console.log(err);
            }
        })();
        function sendMsg() {
            message.channel.send('||<:Trollface:1064487093700669521>||').then((msg: Message) => {
                msg.edit(
                    `**${darkSoulsMsg[Math.floor(Math.random() * darkSoulsMsg.length)]}**\n\`\`\`js\nClient: "${msg.createdTimestamp - message.createdTimestamp}ms"\nAPI: "${Math.floor(endTime - startTime)}ms"\`\`\`
                  `
                );
            });
        }
    } catch (err) {
        sendError(err);
    }
};
