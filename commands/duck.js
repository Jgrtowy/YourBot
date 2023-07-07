const { CommandType } = require('wokcommands');
const axios = require('axios');
const sendError = require('../addons/sendError');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    description: 'Get picture of a duck',
    type: CommandType.SLASH,
    testOnly: true,
    callback: async ({ interaction }) => {
        try {
            const request = await axios({
                method: 'get',
                url: 'https://random-d.uk/api/random',
                headers: { 'content-type': 'application/json' },
            });
            const image = await request.data.url;
            const embed = new EmbedBuilder().setTitle(`Here's amazing pic of duck!`).setImage(image).setColor('Random');
            interaction.reply({
                embeds: [embed],
            });
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
