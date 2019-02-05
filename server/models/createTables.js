const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `
   CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(14) NOT NULL,
    passportUrl VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT 'false'
  )`;

  pool.query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

pool.on('remove', () => {
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
