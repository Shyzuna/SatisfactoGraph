import express from 'express';
import winston from 'winston';

// Bug when getting the logger (no transports ??)
const logger = winston.loggers.get('server');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  //console.log(logger.transports);
  logger.info("[GET] : / => version");
  res.json({
    title: 'SatisfactoGraph',
    version: '1.0.0'
  });
});

export default  apiRouter;
