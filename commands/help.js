const config = require('../config.json');
module.exports = {
  name: 'help',
  description: 'Comandos utilizado no bot',
  async execute(message, Discord){
    const embed = new Discord.MessageEmbed()
      .setTitle(':clipboard: - Lista de comandos')
      .setColor(config.embedcolor)
      .setDescription(`Comandos encaminhado para sua DM ${message.member.user}`)
      .setFooter(config.name, config.imgbot)
      .setTimestamp();

      message.channel.send(embed);
  }
}