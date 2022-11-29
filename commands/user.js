const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply({embeds: [exampleEmbed]})
	},
};

// module.exports = {
//     category: 'MosesUtilities',
//     description: 'Change the bot status',
//     options: [{
//         name: 'type',
//         description: 'Choose an activity type',
//         required: true,
//         type: 3,
//             choices: [{
//                     name: "Playing",
//                 value: '0'
//                 },
//                 {
//                     name: "Watching",
//                     value: '3'
//                 },
//                 {
//                     name: "Streaming",
//                     value: '1'
//                 },
//                 {
//                     name: "Competing in",
//                     value: '5'
//                 },
//                 {
//                     name: "Listening to",
//                     value: '2'
//                 }]

//         },
//         {
//             name: 'status',
//             description: 'Status',
//             required: true,
//             type: 3,
//         }
//     ],
//     slash: true,
//     ownerOnly: true,
//     testOnly: true,

//     callback: ({ client, interaction, args }) => {
//         const type = parseInt(args[0]);
//         const activity = args[1];

//         const activities = {
//             0: "Playing",
//             1: "Streaming",
//             2: "Listening to",
//             3: "Watching",
//             5: "Competing in"
//         };

//         client.user.setActivity({ type, url: 'https://www.twitch.tv/itsgino_', name: activity });

//         if (interaction) {
//             interaction.reply({
//                 content: `> Client presence set to "**${activities[type]} ${activity}**"`,
//                 ephemeral: true
//             });
//         }
//     }
// };