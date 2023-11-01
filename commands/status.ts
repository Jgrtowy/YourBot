import { ActivityOptions, ActivityType, ApplicationCommandOptionType, ClientPresence, ClientPresenceStatus, Presence, PresenceData, PresenceStatus, PresenceStatusData, PresenceUpdateStatus } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';

export default {
    description: 'Change the bot status',
    options: [
        {
            name: 'type',
            description: 'Choose an activity type',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Playing',
                    value: '0',
                },
                {
                    name: 'Watching',
                    value: '1',
                },
                {
                    name: 'Streaming',
                    value: '2',
                },
                {
                    name: 'Competing in',
                    value: '3',
                },
                {
                    name: 'Listening to',
                    value: '5',
                },
            ],
        },
        {
            name: 'what',
            description: 'Description of the activity',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'status',
            description: 'Status of the bot',
            required: false,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Online',
                    value: 'online',
                },
                {
                    name: 'Idle',
                    value: 'idle',
                },
                {
                    name: 'Do Not Disturb',
                    value: 'dnd',
                },
                {
                    name: 'Invisible',
                    value: 'invisible',
                },
            ],
        },
    ],
    type: CommandType.SLASH,
    ownerOnly: true,
    testOnly: true,

    callback: ({ client, interaction }: CommandUsage) => {
        const statuses = {
            online: 'online',
            idle: 'idle',
            dnd: 'dnd',
            invisible: 'invisible',
        };

        const type = Number(interaction.options.getString('type'));
        const what = interaction.options.getString('what');
        const status: PresenceStatusData = statuses[interaction.options.getString('status') || 'online'];

        const activity = {
            name: what,
            type: type,
            url: 'https://jgrtowy.xyz',
        } satisfies ActivityOptions;

        client.user.setActivity(activity);
        client.user.setStatus(status);

        if (interaction) {
            interaction.reply({
                content: `> Client presence set`,
                ephemeral: true,
            });
        }
    },
} satisfies CommandObject;
