const logger = require('../logger');
let activated = false;
module.exports = {
    name: 'reactionrole',
    description: 'Seta um cargo quando o usuário concorda com as regras.',
    async execute(message, args, cmd, client, Discord) {
        const channel = '824702840562778142';
        const newbie = await message.guild.roles.cache.find(role => role.name === 'Newbie');

        const acceptEmoji = '✅';

        if (activated) {
            return message.reply('esse sistema já está ativo neste servidor.');
        } else {
            activated = true;
        }

        message.reply('sistema de aplicação de cargo por aceitação da regra ativado.');
        logger.info(`Sistema de REACTION ROLE ativado pelo ADMINISTRADOR do servidor: id ${message.guild.name}`);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === acceptEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(newbie);
                }
            } else {
                return;
            }

        });

        client.on('messageReactionRemove', async (reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === acceptEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(newbie);
                }
            } else {
                return;
            }
        });

    }
}