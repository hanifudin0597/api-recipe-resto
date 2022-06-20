const db = require('../config/db')

const userModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectAll: (sortByField, sortByType, limitValue, offsetValue) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users ORDER BY ${sortByField} ${sortByType} LIMIT ${limitValue} OFFSET ${offsetValue}  `, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  store: (name, email, phone, password, photo) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, phone, password, photo) VALUES ($1, $2, $3, $4, $5)',
        [name, email, phone, password, photo], (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  update: (id, name, email, phone, password, photo) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET name='${name}', email='${email}', phone='${phone}', password='${password}', photo='${photo}' WHERE id=${id} `,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  CheckStatusActiveUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  softDeleteUser: (id, statusUsers) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET is_active='${statusUsers}' WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  detailUserId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

}

module.exports = userModel
