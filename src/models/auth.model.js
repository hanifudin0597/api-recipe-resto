/* eslint-disable camelcase */
// const { verify } = require('jsonwebtoken')
const db = require('../config/db')

const authModel = {
  storeRegister: (name, email, phone, password, photo, verify_token) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, phone, password, photo, verify_token) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, email, phone, password, photo, verify_token], (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email=$1 ', [email],
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = authModel
