/* eslint-disable indent */
const express = require('express')
const { list, detailUser, softDeleteUser, detailUserId } = require('../controllers/user.controller')
const { listRecipe, recipeByUser, detailRecipe, softDelete } = require('../controllers/recipe.controller')
const { commentByRecipe, listComment, detailComment } = require('../controllers/comment.controller')

const route = express.Router()
const jwtAuth = require('../middleware/jwtAuth')
// const { isAdmin } = require('../middleware/authorization')

route
  // get all data
  .get('/user', list) // menampilkan semua users
  .get('/recipe', listRecipe) // menampilkan semua resep
  .get('/comment', listComment) // menampilkan semua comment
  // get data by id
  .get('/user/:id', detailUser) // menampilkan detail users
  // coba user
  .get('/user-detail/', jwtAuth, detailUserId) // menampilkan detail users
  .get('/recipe/:id', jwtAuth, detailRecipe) // menampilkan detail resep
  .get('/comment/:id', detailComment)

  // soft delete data
  .post('/active-nonacive/:id', softDeleteUser)
  .post('/non-active-recipe/:id', softDelete)

  // other
  .get('/recipeByUser', recipeByUser)
  .get('/commentByRecipe', commentByRecipe)

module.exports = route

  // // get all data
  // .get('/user', jwtAuth, isAdmin, list) //menampilkan semua users
  // .get('/recipe', jwtAuth, isAdmin, listRecipe) //menampilkan semua resep
  // .get('/comment', jwtAuth, isAdmin, listComment) //menampilkan semua comment
  // // get data by id
  // .get('/user/:id', jwtAuth, isAdmin, detailUser) //menampilkan detail users
  // .get('/recipe/:id', jwtAuth, detailRecipe) //menampilkan detail resep
  // .get('/comment/:id', jwtAuth, detailComment)

  // // soft delete data
  // .post('/active-nonacive/:id', jwtAuth, isAdmin, softDeleteUser)
  // .post('/non-active-recipe/:id', jwtAuth, isAdmin, softDelete)

  // // other
  // .get('/recipeByUser', jwtAuth, isAdmin, recipeByUser)
  // .get('/commentByRecipe', jwtAuth, commentByRecipe)
