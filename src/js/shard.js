const file = require('path').resolve(__dirname, './index.js'),
    {
        ShardingManager
    } = require('discord.js');

const shards = new ShardingManager(file, {
	token: require('./config.js').bot.token,
	totalShards: "auto"
});
shards.on("shardCreate", shard => {
	console.log(`[READY] ${new Date().toString().split(" ",5).join(" ")} Launched Shard #${shard.id}`);
});
shards.spawn(shards.totalShards, 30000);