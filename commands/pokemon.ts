import axios from 'axios';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command, CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';

export default {
    description: 'Get info about pokemon',
    type: CommandType.SLASH,
    testOnly: true,
    options: [
        {
            name: 'name-id',
            description: 'Provide name or id of pokemon',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    callback: async ({ interaction, args }: CommandUsage) => {
        try {
            if (interaction) {
                const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${args[0]}`);

                const response = await request.data;

                const embed = new EmbedBuilder()
                    .setTitle(`**${capitalizeFirstLetter(response.name)}** \`#${response.id}\``)
                    .setThumbnail(response.sprites.front_default)
                    .addFields([
                        {
                            name: 'Height',
                            value: `${response.height / 10}m`,
                            inline: true,
                        },
                        {
                            name: 'Weight',
                            value: `${response.weight / 10}kg`,
                            inline: true,
                        },
                        {
                            name: 'Abilities',
                            value: response.abilities
                                .map((ability) => {
                                    return ability.ability.name;
                                })
                                .join(', '),
                            inline: true,
                        },
                    ])
                    .setColor('Random');

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

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
