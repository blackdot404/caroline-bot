const config = require('../config.json');

module.exports = {
  name: 'ping',
  description: 'Esse é o comando de ping.',
  async execute(message, args) {
    let m = await message.channel.send({
      "embed": {
        "description": ":comet: Pinging...",
        "color": config.embedcolor,
        "timestamp": message.createdTimestamp,
        "footer": {
          "icon_url": config.imgbot,
          "text": config.name
        }
      }
    })
  
    let serverms = m.createdTimestamp - message.createdTimestamp;
  
    m.edit({
      "embed": {
        "title": ":ping_pong: **| Pong!**",
        "description": "Latência do Server: **"+serverms+"ms.**",
        "color": config.embedcolor,
        "timestamp": message.createdTimestamp,
        "footer": {
          "icon_url": config.imgbot,
          "text": config.name
        }
      }
    });
  }
}