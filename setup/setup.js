const { Pool, Client } = require('pg');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

(async () => {
  console.log('Running db init script');
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  const commands = await getInitSqlCommands();

  for (const command of commands) {
    try {
      await pool.query(command);
    } catch(e) {
      console.error('db init script error:', e);
    }
  }

  console.log('db init script ran successfully');
})();

async function getInitSqlCommands() {
  const content = await fs.readFile(path.join(process.cwd(), 'setup/init.sql'), { encoding: 'utf8' });
  return content.split(';\n');
}
