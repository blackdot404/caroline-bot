require('dotenv/config');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');
const logger = require('./logger');

client.commands = new Discord.Collection();


// Command Handler
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', async (message) =>{

  if(!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const args = message.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'ping'){
    client.commands.get('ping').execute(message, args, Discord);
  } else if(command === 'help'){
    client.commands.get('help').execute(message, Discord);
  } else if(command === 'clear') {
    client.commands.get('clear').execute(message, args);
  } else if(command === 'kick') {
    client.commands.get('kick').execute(message, args);
  } else if(command === 'ban') {
    client.commands.get('ban').execute(message, args);
  } else if(command === 'mute') {
    client.commands.get('mute').execute(message, args);
  } else if(command === 'unmute') {
    client.commands.get('unmute').execute(message, args);
  }
  
});

// Informações que será apresentado no momento em que o bot iniciar.
client.on('ready', () => {
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
  logger.info(`Bot iniciado, com ${client.users.cache.size} usuarios, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`)
})

client.login(process.env.TOKEN);