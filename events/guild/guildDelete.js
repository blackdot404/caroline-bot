const logger = require('../../logger');

module.exports = (client, Discord, guild) => {
  logger.info(`Bot removido do servidor: ${guild.name} (id: ${guild.id}).`);
}