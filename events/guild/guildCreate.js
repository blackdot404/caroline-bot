const logger = require('../../logger');

module.exports = (client, Discord, guild) => {
  logger.info(`Bot convidado para o servidor: ${guild.name} (id: ${guild.id} população: ${guild.memberCount} membros).`);
}