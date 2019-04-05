import './config/initConfig'

import express from 'express';
import nconf from 'nconf';
import http from 'http';
import winston from 'winston';
import path from 'path';

import ApiRoutes from './api/api';

// May divide in multiples files
const logger = winston.loggers.get('server');

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
