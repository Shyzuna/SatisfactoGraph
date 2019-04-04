import winston from 'winston';
import neode from 'neode';
import nconf from 'nconf';

// Bug when getting the logger (no transports ??)
const logger = winston.loggers.get('server');

// Verify call once or pass instance as module parameters
