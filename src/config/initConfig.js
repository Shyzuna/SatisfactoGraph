import nconf from 'nconf';
import winston from 'winston';
import path from 'path';

// Logger
winston.loggers.add('server', {
  level: 'debug',
  exitOnError: false,
  transports: [
    new winston.transports.Console({level: 'debug'})
  ]
});

const logger = winston.loggers.get('server');
logger.info('Logger \'server\' created.');

// Configuration
const defaultConf  = {
  'server': {
    'port': 8888,
    'host': '127.0.0.1',
    'env': 'dev'
  }
};

// May add argv and env
nconf.file(path.join(__dirname, '../config.json'));
nconf.defaults(defaultConf);

logger.info('Configuration Loaded.');
