const memberCounter = require('../../counters/member-counter');
const config = require('../../config.json');
const logger = require('../../logger');
module.exports = (client, message, cmd, args, Discord) =>{
// Informações que será apresentado no momento em que o bot iniciar.
  //memberCounter(client, Discord);
  let activities = [
    `Utilize ${config.prefix}help para obter ajuda`,
    `${client.guilds.cache.size} servidores!`,
    `${client.channels.cache.size} canais!`,
    `${client.users.cache.size} usuários!`
  ],
  i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "WATCHING"
  }), 100 * 60); 
  client.user
    .setStatus("online")
    .catch(console.error);
  logger.info(`Bot iniciado, com ${client.users.cache.size} usuarios, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
}