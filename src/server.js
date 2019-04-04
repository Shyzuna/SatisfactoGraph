import express from 'express';
import nconf from 'nconf';
import http from 'http';
import winston from 'winston';
import path from 'path';

import ApiRoutes from './api/api';


// May divide in multiples files

// Logger
winston.loggers.add('server', {
  level: 'debug',
  exitOnError: false,
  transports: [
    new winston.transports.Console({level: 'debug'})
  ]
});

const logger = winston.loggers.get('server');
console.log(logger.transports);
// Configuration

const defaultConf  = {
  'server': {
    'port': 8888,
    'host': '127.0.0.1',
    'env': 'dev'
  }
};

// May add argv and env
nconf.file({file: path.resolve(__dirname, '../config.json')});
nconf.defaults(defaultConf);

const PORT = nconf.get('server:port');
const ENV  = nconf.get('server:env');
const HOST = nconf.get('server:host');

// Server
const app = express();
let server = http.createServer(app);
logger.info("Server created");

// Setting Routes
// Use static serve in public directory for resources
app.use(express.static(path.join(__dirname,'./public')));

// API route
app.use('/api', ApiRoutes);

// Default route
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

// Starting server
server.listen(PORT, HOST, (err) => {
  logger.info('Server started on ' + HOST + ':' + PORT);
});

export default app;
