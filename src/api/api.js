import express from 'express';
import winston from 'winston';
import neoDb from '../database/dbGraph'

const logger = winston.loggers.get('server');
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  //console.log(logger.transports);
  logger.info("[GET] : / => version");
  res.json({
    title: 'SatisfactoGraph',
    version: '1.0.0'
  });
}).get('/all', async (req,res) => {
  logger.info("[GET] : /all => Full schema");
  const results = await neoDb.runQuery('Match (n) return n');
  //console.log(results);
  res.json(results);
  /*if(results != null){
    results.then(value => {
      logger.debug(JSON.stringify(value));
      res.json(value);
    }).catch(err => {
      logger.debug(JSON.stringify(error));
      res.json({'error': 'Error'});
    });
  }*/
}).get('/resources', async (req,res) => {
  logger.info("[GET] : /resources => Full schema");
  const results = await neoDb.runQuery('Match (n:Resource) return n');
  //console.log(results);
  res.json(results);
  /*if(results != null){
    results.then(value => {
      logger.debug(JSON.stringify(value));
      res.json(value);
    }).catch(err => {
      logger.debug(JSON.stringify(error));
      res.json({'error': 'Error'});
    });
  }*/
});

export default  apiRouter;
