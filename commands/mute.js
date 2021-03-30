const logger = require('../logger');
const ms = require('ms');
module.exports = {
  name: 'mute',
  aliases: ['unmute'],
  cooldown: 15,
  description: 'Esse comando é para mutar um usuário do servidor.',
  async execute(message, args, cmd, client, Discord) {
    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.reply(`você não possui a permissão necessaria. :no_entry_sign:`);
    const target = message.mentions.users.first();

    if(target) {
      let mainRole = message.guild.roles.cache.find(role => role.name === 'Newbie');
      let muteRole = message.guild.roles.cache.find(role => role.name === 'muted');

      let memberTarget = message.guild.members.cache.get(target.id);

      if(cmd === 'mute'){
        //caso não coloque um tempo para o mute ele irá ficar permanente
        if(!args[1]){
          memberTarget.roles.remove(mainRole.id);
          memberTarget.roles.add(muteRole.id);
          logger.info(`${message.member.nickname} executou o comando MUTE sem time no ${memberTarget} no servidor ${message.guild.name}.`);
          message.reply(`o usuário ${memberTarget} foi mutado sem tempo determinado...`);
          return;
        }

          //caso seja setado um valor que não é um número.
          // if(isNaN(args[1])) return message.reply(`se for determinar um tempo para o usuário que seja um número válido!`);

          //caso seja setado um tempo para o mute.
          memberTarget.roles.remove(mainRole.id);
          memberTarget.roles.add(muteRole.id);
          message.reply(`o usuário ${memberTarget} foi mutado por ${ms(ms(args[1]))}...`);
          logger.info(`${message.member.nickname} executou o comando MUTE com time de ${ms(ms(args[1]))} no ${memberTarget} no servidor ${message.guild.name}.`);

          setTimeout(function() {
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.reply(`o usuário ${memberTarget} foi desmutado.`);
          }, ms(args[1]));
        } else if(cmd === 'unmute') {
          memberTarget.roles.remove(muteRole.id);
          memberTarget.roles.add(mainRole.id);
          logger.info(`${message.member.nickname} executou o comando UNMUTE no ${memberTarget} no servidor ${message.guild.name}.`);
          message.reply(`o usuário ${memberTarget} foi desmutado...`);
        }
      
    } else {
      message.reply(`por favor inserir um usuário válido.`);
    }
        
  }
}