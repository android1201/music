const {
	Client
} = require('discord.js'),
    config = require('./config.js'),
    client = new Client({
		allowedMentions: {
			parse: [
				'users',
				'roles'
			],
			repliedUser: true
		},
		messageCacheMaxSize: 10,
		messageCacheLifetime: 60,
		disableEveryone: true,
		disableMentions: 'all',
		fetchAllMembers: false,
		shards: 'auto',
		shardCount: 5,
		restTimeOffset: 0,
		partials: [
			'MESSAGE',
			'CHANNEL',
			'REACTION',
			'GUILD_MEMBER'
		],
		intents: 32767
    }),
	fs = require('fs'),
	path = require('path');
// client vars
client["discord"] = require('discord.js');
client["devData"] = {
    commands: new client.discord.Collection(),
    config: config,
    discord: require('discord.js'),
    function: {}
};
fs.readdirSync(path.resolve(__dirname, '../client/')).map(file => {
    var fncn = require(path.resolve(__dirname, '../client/' + file));
    if(typeof(fncn) === "function") fncn(client);
});
// login 
client.login(client.devData.config.bot.token);