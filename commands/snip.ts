import axios from 'axios';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';
export default {
    description: 'Snip your url blazingly fast',
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: 'url',
            description: 'Provide URL to snip',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'hidden',
            description: 'If you want to hide the snip from others',
            type: ApplicationCommandOptionType.Boolean,
            required: false,
        },
    ],
    callback: async ({ interaction, args }: CommandUsage) => {
        try {
            if (interaction) {
                const hiddenState: string = args[1] ?? 'false';
                if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(args[0]) || /(?:https?:\/\/)?snip\.gay\/?.*/.test(args[0]))
                    return {
                        content: `> Your URL is invalid`,
                        ephemeral: true,
                    };
                const request = await axios.post('https://snip.gay/api/new', { url: args[0] }, { headers: { 'Content-Type': 'application/json' } });
                const embed = new EmbedBuilder().setTitle(`Here's your snipped URL!`).setDescription(`**${request.data.snipUrl}** created from \`${args[0]}\``).setColor('Random');
                if (hiddenState === 'true') {
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        embeds: [embed],
                    });
                }
            }
        } catch (error) {
            if (interaction) {
                interaction.reply({
                    content: `> Error ocurred, please try again`,
                    ephemeral: true,
                });
                sendError(error);
            }
        }
    },
} satisfies CommandObject;
