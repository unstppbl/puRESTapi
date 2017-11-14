const pg = require('pg');
const config = require('config');

const dbconf = {
  user: config.get('database.user'),
  password: config.get('database.password'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  database: config.get('database.database'),
};

// POOL IMPLEMENTATION
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
// const test = async () => {
//   const res = await pool.query('SELECT * FROM hosts').catch((err) => {
//     console.log(`ERROR IN EXECUTING QUERY: ${err}`);
//     process.exit();
//   });
//   console.log('test');
//   console.log(res.rows);
//   await pool.end();
// };
// test();
// executeQuery('SELECT * FROM hosts', (err, res) => console.log(err));
module.exports = {
  executeQuery,
};

// CLIENT IMPLEMENTATION
// const connectionString = `pg://${dbconf.user}:${dbconf.password}@${dbconf.host}:${dbconf.port}/${dbconf.database}`;
// const client = new pg.Client(connectionString);

// const test = async () => {
//   await client.connect();
//   const res = await client.query('SELECT * FROM hosts').catch((err) => {
//     console.log(`ERROR IN EXECUTING QUERY: ${err}`);
//     process.exit();
//   });
//   console.log('test');
//   console.log(res.rows);
//   await client.end();
// };
// test();

// module.exports = client;