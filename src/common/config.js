require('dotenv').config();

const config = {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  },
  redis: {
    url: process.env.REDIS_URL
  },
  mail: {
    domain: process.env.DOMAIN_MAIL,
    password: process.env.DOMAIN_PASSWORD
  }
};

module.exports = { config };
