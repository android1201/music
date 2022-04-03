module.exports = async (client) => {
    require('colors');
    const fs = require('fs'),
        path = require('path'),
        execute = async (dir) => {
            const events = fs.readdirSync(path.resolve(__dirname, '../events/' + dir + '/')).filter(file => file.endsWith('.js'));
            for(var files of events) {
                var file = require(path.resolve(__dirname, '../events/' + dir + '/' + files));
                if(typeof(file) === "function") {
                    var FileName = files.split('.')[0];
                    client.on(FileName, file.bind(null, client));
                }
            }
        },
        folders = fs.readdirSync(path.resolve(__dirname, '../events/'));
    folders.forEach(file => execute(file));
};