module.exports = async (client) => {
    const fs = require('fs'),
        path = require('path'),
        functions = fs.readdirSync(path.resolve(__dirname, '../functions/')).map(file => {
            var fun = require('../functions/' + file);
            if(typeof(fun) === "function") {
                const name = file.split('.')[0];
                client.devData.function[name] = fun;
            }
        });
};