const pg = require('pg');
const config = require('config');

const dbconf = {
  user: config.get('database.user'),
  password: config.get('database.password'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  database: config.get('database.database'),
};

const pool = new pg.Pool(dbconf);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  console.log(client);
  process.exit(-1);
});

function executeQuery(query, cb) {
  return pool.query(query)
    .then((result) => {
      cb(result, null);
    })
    .catch((err) => {
      console.log(err);
      cb(null, err);
    });
}

module.exports = {
  executeQuery,
};
