module.exports = async (client, interaction) => {
    if(interaction.isContextMenu() || interaction.isCommand()) {
        const command = client.devData.commands.get(interaction.commandName),
            guild = interaction.guild;
        if(!(command || guild)) return;
        try {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
            client["queue"] = await client.player.createQueue(interaction.guild, {
			    metadata: interaction.channel,
                user: interaction.user
            });
            command.run(client, interaction).catch(() => {});
        } catch (e) {
            console.log(e);
        }
    }
}