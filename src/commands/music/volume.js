module.exports = {
    name: 'volume',
    description: 'set music volume!',
    options: [
        {
                    name: 'amount',
                    type: 10,
                    description: 'The volume amount to set (0 - 300)',
                    required: true
        }
    ],
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const channel = client.channels.cache.get(interaction.channel.id);
        let query = interaction.options.getNumber('amount');
        const queue = client.player.getQueue(interaction.guild.id);
        if(query > 300) {
        	query = 300;
        }
        if(query < 0) {
        	query = 0;
        }
        if (!queue || !queue.playing) return void interaction.followUp({ embeds: [{
        		description: `${client.devData.emoji.error} No music is being played!`,
                color: `#dc143c`,
                footer: {
                    text: interaction.user.tag,
                    icon_url: client.user.displayAvatarURL()
                }
			}]
		 });
		const success = queue.setVolume(query);
		return void interaction.followUp({
			embeds: success ? [{
        		description: `${client.devData.emoji.success}  Volume set to **${query}%**!`,
                color: `#6f2da8`,
                footer: {
                    text: interaction.user.tag,
                    icon_url: client.user.displayAvatarURL()
                }
			}] : [{
        		description: `${client.devData.emoji.error}  Something went wrong!`,
                color: `#dc143c`,
                footer: {
                    text: interaction.user.tag,
                    icon_url: client.user.displayAvatarURL()
                }
			}]
        });
    }
};