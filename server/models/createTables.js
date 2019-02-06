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
    );
  CREATE TABLE IF NOT EXISTS
    party(
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      hqAddress VARCHAR(128) NOT NULL,
      logoUrl VARCHAR(128) NOT NULL
    );  
  CREATE TABLE IF NOT EXISTS
    office(
      id SERIAL PRIMARY KEY,
      type VARCHAR(128) NOT NULL,
      name VARCHAR(128) NOT NULL
    );      
  `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
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
