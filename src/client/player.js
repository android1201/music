module.exports = async (client) => { 
    /*
     * console error events 
     */
    client.player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    client.player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    /*
     * player event
     */
    client.player.on("trackStart", (queue, track) => {
        queue.metadata.send({
            embeds: [{
                description: `${client.devData.emoji.playing} **Start playing:** [${track.title}](${track.url})`,
                color: `#6f2da8`,
                footer: {
                    text: `Requested by ${track.requestedBy.username}#${track.requestedBy.discriminator}`,
                    icon_url: client.user.displayAvatarURL()
                }
            }]
        });
    });

    client.player.on("trackAdd", (queue, track) => {
        queue.metadata.send({
            embeds: [{
                description: `${client.devData.emoji.queue} **Track queued:** [${track.title}](${track.url})\n**Duration:** ${track.duration}`,
                color: `#6f2da8`,
                footer: {
                    text: `Requested by ${track.requestedBy.username}#${track.requestedBy.discriminator}`,
                    icon_url: client.user.displayAvatarURL()
                }
            }]
        });
    });
    
    client.player.on("queueEnd", (queue) => {
        queue.metadata.send({
            embeds: [{
                description: `${client.devData.emoji.success} Queue ended!`,
                color: `#6f2da8`
            }]
        });
    });
};