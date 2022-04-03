const config = require ('./config.js');
if(config) {
    if(config.bot) {
        if(!config.bot.token || !config.bot.token.length) console.log('Token not found!');
        if(!config.bot.mongo || !config.bot.mongo.length) console.log('Mongo not found!');
        else require('./shard.js');
    }
};