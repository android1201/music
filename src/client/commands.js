module.exports = async (client) => {
    const fs = require('fs'),
        path = require('path'),
        slash = [];
    fs.readdirSync(path.resolve(__dirname, '../commands/')).forEach(c => commands(c));
    function commands(dir) {
        const cmds = fs.readdirSync(path.resolve(__dirname, '../commands') + '/' + dir);
        for(var files of cmds) {
            const file = require('../commands/' + dir + '/' + files);
            if(['MESSAGE', 'USER'].includes(file.type)) delete file.description;
            if(file.permissions) file.permissions = false;
            console.log(file);
            client.devData.commands.set(file.name, file);
            var obj = {
                name: file.name ? file.name : false,
                description: file.description ? file.description : false,
                options: file.options ? file.options : false,
                type: file.type ? file.type : false,
                default_permission: file.permissions ? file.permissions : false
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