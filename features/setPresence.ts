import { ActivityType } from 'discord.js';
import sendError from '../addons/sendError';

export default async (instance: any, client: any) => {
    try {
        client.user.setStatus('idle');
        client.user.setPresence({
            activities: [{ name: 'darksouls', type: ActivityType.Playing }],
        });
        console.log('Presence is set!');
    } catch (error) {
        sendError(error);
    }
};
