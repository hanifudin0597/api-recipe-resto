/* eslint-disable camelcase */
const db = require('../config/db')

const recipeModel = {
  latestRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe ORDER BY date DESC LIMIT 6', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM recipe', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectAll: (sortByField, sortByType, limitValue, offsetValue, search) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE title ILIKE '%${search}%' ORDER BY ${sortByField} ${sortByType} LIMIT ${limitValue} OFFSET ${offsetValue} `, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  store: (photo, title, ingredients, video, user_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipe (photo, title, ingredients, video, user_id) VALUES ($1, $2, $3, $4, $5)',
        [photo, title, ingredients, video, user_id], (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  update: (id, photo, title, ingredients, video, user_id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recipe SET photo='${photo}', title='${title}', ingredients='${ingredients}', video='${video}' WHERE id=${id} AND user_id='${user_id}' `,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  destroy: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipe WHERE id='${id}' and user_id='${userId}'`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  recipeByUser: (search) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT users.id, users.name, recipe.title, recipe.ingredients FROM users LEFT JOIN recipe ON 
      users.id=recipe.user_id WHERE users.name LIKE '%${search}%' ORDER BY users.name DESC ;`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  MyRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE user_id='${id}' `, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  check: (userId, id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE user_id='${userId}' AND id='${id}' `, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  softDelete: (id, statusrecipes) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recipe SET is_active='${statusrecipes}' WHERE id='${id}' `, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  CheckStatusActiverecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE id='${id}' `, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  recipePublic: (limitValue, offsetValue) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe WHERE is_active=1 ', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  allDataRecipePublic: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM recipe WHERE is_active=1 ', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

}

module.exports = recipeModel
