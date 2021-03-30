const logger = require('../logger');
module.exports = {
  name: 'clear',
  cooldown: 10,
  description: 'Limpa as mensagens de acordo com a quantidade estipulada.',
  async execute(message, args, cmd, client, Discord) {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`você não possui a permissão necessaria. :no_entry_sign:`); //valida se o usuario que executou tem as devidas permissões
    if(!args[0]) return message.reply(`você deve digitar a quantidade de messagens que deseja excluir.` );// valida se foi digitado uma quantidade
    if(isNaN(args[0])) return message.reply(`por favor digite um número válido.` ); // valida se foi digitado um número

    //seta o maximo de mensagens e o minimo
    if(args[0] > 100) return message.reply(`você só pode apagar no máximo 100 messagens.`);
    if(args[0] < 1) return message.reply(`você precisa apagar pelo menos uma messagem.`);

    const fetched = await message.channel.messages.fetch({
      limit: args[0]
    });
    message.channel.bulkDelete(fetched);
    logger.info(`${message.member.nickname} executou o comando CLEAR no servidor ${message.guild.name}.`);
    message.reply(`**${args[0]} mensagens limpas nesse chat!**`).then(msg => msg.delete({timeout: 5000}))
      .catch(error =>
        logger.error(`Não foi possível deletar mensagens devido a: ${error}`)
    );
  }
}