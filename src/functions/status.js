module.exports = async (data = {}) => {
	require('colors');
	setInterval(() => {
		var totalusers = data.client.users.cache.size,
			totalservers = data.client.guilds.cache.size,
			totalemojis = data.client.emojis.cache.size,
			statusm = data.client.devData.config.bot.status_message,
			status =
			statusm.replace(/%servers%/g, totalservers).replace(/%users%/g, totalusers).replace(/%emojis%/g, totalemojis);
		data.client.user.setActivity(status, {
			type: 'STREAMING',
			url: 'https://www.twitch.tv/monstercat/'
		});
	}, 1000);
};