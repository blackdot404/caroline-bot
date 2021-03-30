const logger = require('../logger');
module.exports = {
  name: 'unmute',
  description: 'Esse comando é para desmutar um usuário do servidor.',
  async execute(message, args, Discord, client) {
    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.reply(`você não possui a permissão necessaria. :no_entry_sign:`);
    const target = message.mentions.users.first();

    if(target) {
      let mainRole = message.guild.roles.cache.find(role => role.name === 'Newbie');
      let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

      let memberTarget = message.guild.members.cache.get(target.id);

      memberTarget.roles.remove(muteRole.id);
      memberTarget.roles.add(mainRole.id);
      logger.info(`${message.member.nickname} executou o comando UNMUTE no ${memberTarget} no servidor ${message.guild.name}.`);
      message.reply(`o usuário ${memberTarget} foi desmutado...`);
    } else {
      message.reply(`por favor inserir um usuário válido.`);
    }
        
  }
}