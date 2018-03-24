const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    url: process.env.DEV_DB_URL,
    dialect: 'postgres',
    logging: false
  },
  test: {
    url: process.env.TEST_DB_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres',
    logging: false
  }
}

