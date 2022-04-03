module.exports = async (client) => {
    const app = require('express')();
    app.listen(9067, () => {
        console.log('play = alive!')
    })
}