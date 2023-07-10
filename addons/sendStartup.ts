import { EmbedBuilder, WebhookClient } from 'discord.js';
require('dotenv').config();

const sendStartup = (time: any, condition: any) => {
    const webhook = new WebhookClient({ url: process.env.STARTUPWH });
    let embed;
    switch (condition) {
        case 0:
            embed = new EmbedBuilder().setTitle(`⏱️ Yo(ur) bot is starting`).setTimestamp().setColor('Blurple');
            break;
        case 1:
            embed = new EmbedBuilder().setTitle(`🎉 Yo(ur) bot started successfully in **${time}s!**`).setTimestamp().setColor('Green');
            break;
    }
    webhook.send({
        embeds: [embed],
    });
};

export default sendStartup;
