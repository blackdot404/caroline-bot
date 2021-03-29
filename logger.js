const logger = require('pino')({
  level: 'debug',
  prettyPrint: {
    levelFirst: true,
    colorize: true,
    translateTime: 'SYS:standard',
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`  
  }  
});

module.exports = logger;