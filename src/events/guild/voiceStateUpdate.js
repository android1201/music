module.exports = async (client, oldState, newState) => {
	const queue = client.player.getQueue(newState.guild.id);
	if (!queue || !queue.connection) return;
	const stateChange = {};
	if (oldState.channel === null && newState.channel !== null)
    	stateChange.type = "JOIN";
    console.log('1');
	if (oldState.channel !== null && newState.channel === null)
    	stateChange.type = "LEAVE";
    console.log('2');
	if (oldState.channel !== null && newState.channel !== null)
 	   stateChange.type = "MOVE";
    console.log('3');
   if (oldState.channel === null && newState.channel === null) return; // you never know, right
   if (newState.serverMute == true && oldState.serverMute == false)
 	   return queue.setPaused(true);
   if (newState.serverMute == false && oldState.serverMute == true)
  	  return queue.setPaused(false);
  if (stateChange.type === "MOVE") {
    	if (oldState.channel.id === queue.connection.channel) stateChange.type = "LEAVE";
      console.log('4');
    	if (newState.channel.id === queue.connection.channel) stateChange.type = "JOIN";
      console.log('5');
  }
  if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
  if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;
  if (!stateChange.channel || stateChange.channel.id !== queue.connection.channel)
    return;
  stateChange.members = stateChange.channel.members.filter(
    (member) => !member.user.bot
  );

  switch (stateChange.type) {
    case "JOIN":
      if (client.config.alwaysplay === false) {
        if (stateChange.members.size === 1 && queue.paused) {
          let playerResumed = client
            .Embed()
            // say that the queue has been resumed
            .setTitle(`Resumed!`, client.config.iconURL)
            .setFooter({ text: `The current song has been resumed.` });
          await client.channels.cache
            .get(queue.metadata)
            .send({ embeds: [playerResumed] });

          //!BUG Updated nowplaying message doesn't show buttons
          // update the now playing message and bring it to the front
          let playerPlaying = await client.channels.cache
            .get(queue.metadata)
            .send({
              embeds: [player.nowPlayingMessage.embeds[0]],
              components: [client.createController(player.options.guild)],
            });
          player.setNowplayingMessage(playerPlaying);
          queue.setPaused(false);
        }
      }
      break;
    case "LEAVE":
      if (client.config.alwaysplay === false) {
        if (
        	stateChange.members.size === 0 &&
			queue.playing) {
          queue.setPaused(true);

          let playerPaused = client
            .Embed()
            .setTitle(`Paused!`, client.config.iconURL)
            .setFooter({
              text: `The current song has been paused because theres no one in the voice channel.`,
            });
          await client.channels.cache
            .get(player.textChannel)
            .send({ embeds: [playerPaused] });
        }
      }
      break;
  }
};