/* eslint-disable quotes */
require('dotenv/config')
const { Pool } = require('pg')

const db = new Pool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // port: process.env.DB_PORT

  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }

})

db.connect((err) => {
  if (err) {
    console.log(err)
  }
  console.log("Database connected")
})

module.exports = db
