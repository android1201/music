module.exports = {
   bot: {
       emoji_guild: "960285861927329834",
       emojis: [
           "playing"
       ],
       mongo: process.env.mongo ? process.env.mongo : "",
       status_message: "%servers% servers and watching over %users% members with %emojis% emojis",
       token: process.env.token ? process.env.token : "",
   }
};