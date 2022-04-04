module.exports = {
    name: 'play',
    description: 'play or add a song to queue!',
    options: [
        {
                    name: 'song',
                    type: 3,
                    description: 'The song name or link you want to play',
                    required: true
        }
    ],
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const channel = client.channels.cache.get(interaction.channel.id);
        const query = interaction.options.getString('song');
        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.user
            })
            .catch((e) => {
                console.log(e);
            });
        if (!searchResult || !searchResult.tracks.length) return interaction.followUp({ content: 'No results were found!' });

        const queue = await client.player.createQueue(guild, {
			metadata: channel,
            user: interaction.user
        });

        const member = guild.members.cache.get(interaction.user.id) ?? await guild.members.fetch(interaction.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(interaction.guild.id);
            return interaction.followUp({ content: 'Could not join your voice channel!' });
        }

        await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
};