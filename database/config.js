require('dotenv').config()

const development = {
  "username": "sa",
  "password": process.env.SA_PASSWORD,
  "database": "master",
  "host": "127.0.0.1",
  "dialect": "mssql"
}

module.exports = { development }