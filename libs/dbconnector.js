const mariadb = require('mariadb');

const config = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI =  `mariadb://${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${config.dbName}`;


const dbConfig = {
  host: 'localhost',
  user: 'rasol',
  password: '123',
  database: 'adminwisp',
  connectionLimit : 5,
  acquireTimeout:300
}

class DBConnector {
  dbconnector = mariadb.createPool(dbConfig)

  async query(param) {
    var conn = await  this.dbconnector.getConnection();
    var ret = null;
    conn.query (param).
      then (data => {
        ret = data;
        console.log(data);
        conn.end();
      })
      .catch (err => {
        console.log(err);
        conn.end();
      })
      return ret
  }
}

module.exports = new DBConnector() ;
