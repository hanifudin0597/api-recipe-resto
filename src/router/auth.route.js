const express = require('express')
const { registerAccount, loginAccount } = require('../controllers/auth.controller')

const route = express.Router()
const upload = require('../middleware/upload')

route
  .post('/login', loginAccount)
  .post('/register', upload, registerAccount)

module.exports = route

  // .post('/login', loginAccount)
  // .post('/register', upload, registerAccount)