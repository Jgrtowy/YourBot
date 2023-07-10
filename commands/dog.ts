import axios from 'axios';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { CommandObject, CommandType, CommandUsage } from 'wokcommands';
import sendError from '../addons/sendError';
export default {
    type: CommandType.SLASH,
    testOnly: true,
    description: 'Get picture of cute dog or see list of avaiable breeds',
    options: [
        {
            name: 'picture',
            description: 'Get picture of cute doggo',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'breed',
                    required: false,
                    description: 'Type in breed of dog you want to see',
                    type: ApplicationCommandOptionType.String,
                },
            ],
        },
        {
            name: 'list',
            description: 'See list of all breeds avaiable',
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    callback: async ({ interaction, args }: CommandUsage) => {
        try {
            switch (interaction?.options.getSubcommand()) {
                case 'list':
                    const embed = new EmbedBuilder().setTitle(`🚧 Command under construction`).setDescription(`
                              Meanwhile you can check the list here: <https://dog.ceo/api/breeds/list/all>.
                              If the dog has subname in it's name for example **"australian": ["shepherd"]** you should type the name like this: \`name/subname\` for example \`australian/shepherd\`
                        `);
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true,
                    });
                    break;
                case 'picture':
                    if (interaction) {
                        const breed = interaction.options.getString('breed');

                        if (breed === 'undefined') {
                            const request = await axios.get('https://dog.ceo/api/breeds/image/random');
                            const image = await request.data.message;
                            const embed = new EmbedBuilder().setTitle(`Here's great pic of doggo!`).setImage(image);
                            interaction.reply({
                                embeds: [embed],
                            });
                        } else {
                            const request = await axios.get(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
                            const image = await request.data.message;
                            const embed = new EmbedBuilder().setTitle(`Here's great pic of doggo!`).setImage(image);
                            interaction.reply({
                                embeds: [embed],
                            });
                        }
                    }
                    break;
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
