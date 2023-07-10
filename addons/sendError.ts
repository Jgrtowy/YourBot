import { EmbedBuilder, WebhookClient } from 'discord.js';
require('dotenv').config();

const sendError = (error: any) => {
    const webhook = new WebhookClient({ url: process.env.ERRORWH });
    const embed = new EmbedBuilder().setTitle(`Error on Yo(ur) bot occured!`).setDescription(`**Here's error message:**\n\`\`\`js\n${error}\`\`\``).setTimestamp().setColor('Red');
    webhook.send({
        embeds: [embed],
    });
};

export default sendError;
