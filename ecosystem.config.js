module.exports = {
    apps: [
        {
            name: 'my-bot',
            script: 'index.js',
            env: {
                TOKEN: process.env.TOKEN,
                STARTUPWH: process.env.STARTUPWH,
                ERRORWH: process.env.ERRORWH,
            },
        },
    ],
};
