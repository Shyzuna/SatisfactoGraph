import winston from 'winston';
import neode from 'neode';
import nconf from 'nconf';

const logger = winston.loggers.get('server');

// Verify call once or pass instance as module parameters
let neoDb = {
  db: null,
  connection: () => {
    const url = nconf.get('database:host');
    const port = nconf.get('database:port');
    const username = nconf.get('database:username');
    const password = nconf.get('database:password');

    logger.info('Connecting to Neo4j database :\n- bolt://' + url + ':' + port + '\n- ' + username + '\n- ******');
    try {
      neoDb.db = new neode('bolt://' + url + ':' + port, username, password);
    } catch (e) {
      logger.error('An error occurred while connecting\n' + e);
      return;
    }
    logger.info('Connection established.')
  },
  runQuery: async (query, parameters={}) => {
    if(neoDb.db == null){
      logger.warning('No connection established.');
      return null;
    }
    logger.info('Request : "' + query + '" with params : ' + JSON.stringify(parameters));
    return neoDb.db.cypher(query, parameters);
  }
};

neoDb.connection();

export default neoDb
