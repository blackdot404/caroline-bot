const logger = require('../logger');
module.exports = {
  name: 'kick',
  cooldown: 5,
  description: 'Esse comando é para chutar um usuário do servidor. Você pode colocar uma razão para está chutando um usuário do servidor.',
  async execute(message, args, cmd, client, Discord) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`você não possui a permissão necessaria. :no_entry_sign:`);

    const member = message.mentions.users.first();
    args.shift();
    const reasion = args.join(' ');

    if(member) {
      const memberTarger = message.guild.members.cache.get(member.id);
      memberTarger.kick(reasion);
      message.reply(`Usuário ${member} chutado com sucesso. Pelo motivo: **${reasion}**`);
      logger.info(`${message.member.nickname} executou o comando KICK no ${memberTarger} no servidor ${message.guild.name}.`);
    } else {
      return message.reply('mencione um usuário válido.');
    }
  }
}