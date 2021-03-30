const logger = require('../logger');
module.exports = {
  name: 'ban',
  description: 'Esse comando é para banir um usuário do servidor. Você pode colocar uma razão para está banindo um usuário do servidor.',
  async execute(client, message, args, Discord) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`você não possui a permissão necessaria. :no_entry_sign:`);

    const member = message.mentions.users.first();
    args.shift();
    const days = args.shift();
    const reasion = args.join(' ');

    if(member) {
      if(isNaN(days)) return message.reply(`informar uma quantidade de dias valido.`);
      const memberTarger = message.guild.members.cache.get(member.id);
      memberTarger.ban({days: days, reasion: reasion});
      message.reply(`Usuário ${member} banido com sucesso. Pelo motivo: **${reasion}**`);
      logger.info(`${message.member.nickname} executou o comando BAN no ${memberTarger} no servidor ${message.guild.name}.`);
    } else {
      return message.reply('mencione um usuário válido.');
    }
  }
}