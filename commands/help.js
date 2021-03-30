const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'help',
  aliases: ['h','ajuda'],
  description: 'Comandos utilizado no bot',
  async execute(message, args, cmd, client, Discord){
    const embed = new MessageEmbed()
      .setTitle(':clipboard: - Lista de comandos')
      .setColor(config.embedcolor)
      .setDescription(`Comandos encaminhado para sua DM ${message.member.user}`)
      .setFooter(config.name, config.imgbot)
      .setTimestamp();

      message.channel.send(embed);
  }
}