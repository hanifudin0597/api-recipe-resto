const db = require('../config/db')

const commentModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM comment', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectAll: (sortByField, sortByType, limitValue, offsetValue) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comment ORDER BY ${sortByField} ${sortByType} LIMIT ${limitValue} OFFSET ${offsetValue}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comment WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  store: (recipe_id, comment_text, user_id) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO comment (recipe_id, comment_text, user_id) VALUES ($1, $2, $3)',
        [recipe_id, comment_text, user_id], (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  update: (id, recipe_id, comment_text, user_id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE comment SET recipe_id='${recipe_id}', comment_text='${comment_text}', user_id='${user_id}' WHERE id=${id} `,
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
      db.query(`DELETE FROM comment WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  commentByRecipe: (search) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT recipe.id, recipe.title, recipe.ingredients, comment.comment_text FROM recipe LEFT JOIN comment ON 
      recipe.id=comment.recipe_id WHERE recipe.title ILIKE '%${search}%' ORDER BY recipe.id DESC`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  MyComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comment WHERE user_id='${id}'`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = commentModel
