import axios from 'axios';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import sha256 from 'sha256';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';

export default {
    description: "Get someone's gravatar",
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: 'email',
            description: 'Provide email to get gravatar',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'size',
            description: 'Size of the image (1-2048, default: 80)',
            type: ApplicationCommandOptionType.Integer,
            required: false,
        },
        {
            name: 'hidden',
            description: 'If you want to hide the gravatar from others',
            type: ApplicationCommandOptionType.Boolean,
            required: false,
        },
    ],
    callback: async ({ interaction }: CommandUsage) => {
        try {
            if (interaction) {
                const hash = sha256(interaction.options.getString('email'));
                const str = `https://gravatar.com/avatar/${hash}?d=mp&s=${interaction.options.getInteger('size') ?? 80}}`;
                const embed = new EmbedBuilder().setTitle(`Here's your gravatar!`).setImage(str).setColor('Random');
                interaction.reply({
                    embeds: [embed],
                    ephemeral: interaction.options.getBoolean('hidden') ?? false,
                });
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
