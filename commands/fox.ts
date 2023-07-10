import axios from 'axios';
import { EmbedBuilder } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';
export default {
    description: 'Get picture of cute fox :3',
    type: CommandType.SLASH,
    testOnly: true,
    callback: async ({ interaction }: CommandUsage) => {
        try {
            if (interaction) {
                const request = await axios.get('https://randomfox.ca/floof/');
                const image = await request.data.image;
                const embed = new EmbedBuilder().setTitle(`Here's cute pic of fox!`).setImage(image).setColor('Random');
                interaction.reply({
                    embeds: [embed],
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
