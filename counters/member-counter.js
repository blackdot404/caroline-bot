const logger = require('../logger');
module.exports = async (client, Discord) => {
  const guild = client.guilds.cache.get('277453110220161024');
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get('826486222401568780');
    channel.setName(`Membros: ${memberCount.toLocaleString()}`);
    logger.info(`Atualizando contagem de membros.`);
  }, 300000);
}