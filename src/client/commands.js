module.exports = async (client) => {
    const fs = require('fs'),
        path = require('path'),
        slash = [];
    fs.readdirSync(path.resolve(__dirname, '../commands/')).forEach(c => commands(c));
    function commands(dir) {
        const cmds = fs.readdirSync(path.resolve(__dirname, '../commands') + '/' + dir);
        for(var files of cmds) {
            const file = require('../commands/' + dir + '/' + files);
            client.devData.commands.set(file.name, file);
            var obj = {
                name: file.name ? file.name : undefined,
                description: file.description ? file.description : undefined,
                options: file.options ? file.options : undefined,
                type: file.type ? file.type : undefined,
                default_permission: file.permissions ? file.permissions : undefined
            };
            slash.push(obj)
        }
    };
    client.on('ready', () => {
        slash.forEach(cmd => {
            (async () => {
                await client.application.commands.create(cmd);
            })();
        });
    });
};