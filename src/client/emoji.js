module.exports = async (client) => {
	client.on('ready', () => {
		const guild = client.guilds.cache.get(client.devData.config.bot.emoji_guild);
		if (guild) {
			var list = client.devData.config.bot.emojis;
			formater(list);
			function formater(el) {
				var obj = {}
				el.forEach(v => {
					const i = guild.emojis.cache.find(x => x.name === v);
					if(i) {
						var check = i.animated ? '<a:' : '<:',
							format = `${check}${i.name}:${i.id}>`
						obj[i.name] = format;
						client.devData.emoji = obj;
					} else {
						obj[v] = `:${v}:`;
						client.devData.emoji = obj;
					}
				});
			}
		} else {
            console.log('emojis ka guild ni mila!')
            process.exit();
        }
	});
}