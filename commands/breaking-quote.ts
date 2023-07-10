import axios from 'axios';
import { EmbedBuilder } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';
export default {
    description: 'Get random quote from Breaking Bad',
    type: CommandType.SLASH,
    testOnly: true,
    callback: async ({ interaction }: CommandUsage) => {
        try {
            const request = await axios.get('https://api.breakingbadquotes.xyz/v1/quotes');
            const response = await request.data;
            const responseEmbed = new EmbedBuilder().setTitle(`Here's your quote:`).setDescription(`*${response[0].quote}*\n\nSaid by **${response[0].author}**`).setColor('Random');
            if (interaction) {
                interaction.reply({
                    embeds: [responseEmbed],
                });
            }
        } catch (error) {
            if (interaction) {
                interaction.reply({
                    content: `> Something's failed... Try again later`,
                });
                sendError(error);
            }
        }
    },
} as CommandObject;
