const { Pool, Client } = require('pg')
const { config } = require("./config");

function createPool() {
  const { user, database, host, password, port } = config.db;
  return new Pool({
    user,
    host,
    database,
    password,
    port,
  })
}

module.exports = { connection: createPool() };
