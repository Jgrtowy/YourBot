import axios from 'axios';
import { EmbedBuilder } from 'discord.js';
import { Command, CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';
export default {
    description: 'Get random useless fact',
    type: CommandType.SLASH,
    testOnly: true,
    callback: async ({ interaction }: CommandUsage) => {
        try {
            const request = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');
            const response = await request.data;
            const responseEmbed = new EmbedBuilder().setTitle(`Here's your random fact:`).setDescription(`> **${response.text}**`).setColor('Random');
            if (interaction) {
                interaction.reply({
                    embeds: [responseEmbed],
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
