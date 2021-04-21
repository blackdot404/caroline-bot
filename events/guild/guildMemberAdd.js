const config = require('../../config.json');

module.exports = async (client, Discord, guildMember) => {
  // let welcomeRole = await guildMember.guild.roles.cache.find(role => role.name === 'Newbie');
  let welcomeChannel = await guildMember.guild.channels.cache.get('824700294360989737');
  let welcomeServer = await client.guilds.cache.get('277453110220161024');
  let textRoles = await client.channels.cache.get('824702840562778142');
  let guildImage = await client.guild.iconURL.cache.get('277453110220161024');

  // guildMember.roles.add(welcomeRole);

  let embed = await new Discord.MessageEmbed()
    .setColor(config.embedcolor)
    .setTitle(`:mega: Bem vindo(a) :mega:`)
    .setDescription(`**${guildMember.user}**, bem-vindo(a) ao servidor **${welcomeServer.name}**! 
      \nAtualmente estamos com **${welcomeServer.memberCount} membros**.
      \nNão esqueça de ler as <#${textRoles.id}>`)
    .setFooter(config.name, config.imgbot)
    .setTimestamp()
    .setThumbnail(guildImage);

  welcomeChannel.send(embed);
}