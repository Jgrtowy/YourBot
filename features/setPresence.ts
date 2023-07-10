const sendError = require('../addons/sendError');
const { ActivityType } = require('discord.js');

export default async (instance: any, client: any) => {
    try {
        client.user.setStatus('idle');
        client.user.setPresence({
            activities: [{ name: 'darksouls', type: ActivityType.Playing }],
        });
    } catch (error) {
        sendError(error);
    }
};
