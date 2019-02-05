export default {
  user: 'victor', // this is the db user credential
  database: 'politico_db', // the database name we want to connect to
  password: 'password', // the password required to access our database
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};
