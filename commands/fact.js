const { CommandType } = require('wokcommands');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const sendError = require('../addons/sendError');
module.exports = {
    description: 'Get random useless fact',
    type: CommandType.SLASH,
    testOnly: true,
    callback: async ({ interaction }) => {
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
};
