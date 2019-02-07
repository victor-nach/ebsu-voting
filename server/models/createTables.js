import { Pool } from 'pg';
import dotenv from 'dotenv';

require('make-runnable');

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
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR (128) NOT NULL,
    lastName VARCHAR (128) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    phoneNumber VARCHAR(128) NOT NULL,
    passportUrl TEXT NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT (false),
    hashedPassword VARCHAR (128) NOT NULL
  );

  DROP TABLE IF EXISTS parties CASCADE;  
  CREATE TABLE parties(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR (128) UNIQUE NOT NULL,
    hqAddress VARCHAR (128) NOT NULL,
    logoUrl TEXT NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW())
  );  

  DROP TABLE IF EXISTS offices CASCADE;  
  CREATE TABLE offices(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    type VARCHAR (128) NOT NULL
  );      

  DROP TABLE IF EXISTS candidates CASCADE; 
  CREATE TABLE candidates(
    id SERIAL NOT NULL PRIMARY KEY,
    officeId INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
    partyId INT NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
  ); 

  DROP TABLE IF EXISTS votes CASCADE; 
  CREATE TABLE votes(
    id SERIAL NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    officeId INT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
    candidateId INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    PRIMARY KEY (officeId, createdBy)
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


pool.on('remove', () => {
  process.exit(0);
});

createTables();

export default createTables;
