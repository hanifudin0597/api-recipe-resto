/* eslint-disable indent */
const express = require('express')
const { insertRecipe, updateRecipe, MyRecipe, destroy, latestRecipe, recipePublic } = require('../controllers/recipe.controller')
const { insertComment, updateComment, MyComment, destroyComment } = require('../controllers/comment.controller')

const route = express.Router()
// const authStatic = require('../middleware/staticAuth')
const jwtAuth = require('../middleware/jwtAuth')
// const { isCustomer, isAdmin } = require('../middleware/authorization')
const upload = require('../middleware/upload')

route
  .post('/recipe', jwtAuth, upload, insertRecipe)

  // .post('/recipe', insertRecipe)
  .put('/recipe/:id', jwtAuth, upload, updateRecipe)
  .get('/myRecipe', jwtAuth, MyRecipe)
  .delete('/delete-recipe/:id', jwtAuth, destroy)

  .post('/comment', insertComment)
  .put('/comment/:id', updateComment)
  .get('/myComment', MyComment)
  .post('/deleteComment/:id', destroyComment)

  // public endpoint
  .get('/latest-recipe', latestRecipe)
  .get('/recipe-public', recipePublic)

module.exports = route

  // .post('/recipe', jwtAuth, isCustomer, upload, insertRecipe)
  // .put('/recipe/:id', jwtAuth, isCustomer, upload, updateRecipe)
  // .get('/myRecipe', jwtAuth, isCustomer, MyRecipe)
  // .post('/delete-recipe/:id', jwtAuth, isCustomer, upload, destroy)

  // .post('/comment', jwtAuth, isCustomer, insertComment)
  // .put('/comment/:id', jwtAuth, isCustomer, updateComment)
  // .get('/myComment', jwtAuth, isCustomer, MyComment)
  // .post('/deleteComment/:id', jwtAuth, isCustomer, destroyComment)

  // // public endpoint
  // .get('/latest-recipe', latestRecipe)
  // .get('/recipe-public', jwtAuth, isCustomer, recipePublic)
