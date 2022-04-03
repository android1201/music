module.exports = {
   bot: {
       mongo: process.env.mongo ? process.env.mongo : "",
       status_message: "%servers% servers and watching over %users% members with %emojis% emojis",
       token: process.env.token ? process.env.token : "" 
   }
};