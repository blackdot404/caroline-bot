const config = require('../../config.json');
const logger = require('../../logger');

const cooldowns = new Map();

module.exports = (client, Discord, message) => {

  if(!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  try {
    // BLOCO DO COOLDOWN
    if(!cooldowns.has(command.name)){
      cooldowns.set(command.name, new Discord.Collection());
    }
  
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;
  
    if(time_stamps.has(message.author.id)) {
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
  
      if(current_time < expiration_time){
        const time_left = (expiration_time - current_time) / 1000;
        let embed = new Discord.MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle(`:hourglass_flowing_sand: Por favor aguardar ${time_left.toFixed(1)} segundos para utilizar o comando novamente.`);
        return message.channel.send(embed);
      }
    }
    
    time_stamps.set(message.author.id, current_time);
    //Apaga o user id quando o cooldown terminar
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    
    //BLOCO PARA EXECUTAR O COMANDO.
    command.execute(message, args, cmd, client, Discord);
    logger.debug(`O comando ${cmd} foi executado pelo usuario ${message.member.nickname} no servidor ${message.guild.name}`);
  } catch(e){
    let embed = new Discord.MessageEmbed()
      .setColor(config.embedcolor)
      .setTitle(`:no_entry_sign: Comando não existe, tente ${config.prefix}help.`);
    message.channel.send(embed);
    logger.error(`O comando ${cmd}, não foi encontrado.`);
  }
}