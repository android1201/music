module.exports = async (client) => {
    require('colors');
    client.devData.function.status({
        client: client
    })
    console.log(`${client.user.username} jinda ho gya!`.blue);
};