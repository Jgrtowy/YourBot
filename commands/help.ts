import { EmbedBuilder } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';

export default {
    description: 'See list of all commands',
    type: CommandType.SLASH,
    testOnly: true,
    callback: async ({ interaction }: CommandUsage) => {
        try {
            const embed = new EmbedBuilder()
                .setTitle('List of currently available commands')
                .setDescription(
                    `
                    **API Commands**

                    \`/breaking-quote\` - get random quote from Breaking Bad
                    \`/fox\` - get random picture of fox
                    \`/duck\` - get random picture of duck
                    \`/dog [breed]\` - get random picture of dog and you can even choose breed of it
                    \`/fact\` - get random fact you'll probably didn't know
                    \`/snip\` - snip your url blazingly fast using \`snip.gay\`

               `
                )
                .setColor('Random');
            if (interaction) {
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
