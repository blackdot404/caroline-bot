const config = require('../../config.json');

module.exports = (client, Discord, message) => {

  if(!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);

  if(command) command.execute(client, message, args, Discord);
}