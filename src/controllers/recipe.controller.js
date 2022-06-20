/* eslint-disable no-unused-vars */
const recipeModel = require('../models/recipe.model')
const { success, failed } = require('../helpers/response')
const deleteFile = require('../helpers/deleteFile')
const { allDataRecipePublic } = require('../models/recipe.model')

const recipeController = {
  latestRecipe: async (req, res) => {
    try {
      const result = await recipeModel.latestRecipe()
      success(res, result.rows, 'success', 'get latest recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get lates recipe failed')
    }
  },
  listRecipe: async (req, res) => {
    try {
      // tangkap semua parameter dari body dengan destructuring
      const { sortField, sortType, page, limit, searchRecipe } = req.query
      // kondisi untuk sorting dan search resep
      const search = searchRecipe || ''
      const sortByField = sortField || 'recipe'
      const sortByType = sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC'

      // pagination
      const pageValue = page ? Number(page) : 1
      const limitValue = limit ? Number(limit) : 6
      const offsetValue = (pageValue - 1) * limitValue

      // panggil semua data dan dihitung semua record dalam tabel users
      const allData = await recipeModel.allData()
      // hitung record tabel recipe
      const totalData = Number(allData.rows[0].total)
      // kirim parameter dan value kedalam database lewat model
      recipeModel.selectAll(sortByField, sortByType, limitValue, offsetValue, search)
        .then((result) => {
          // informasi pagination
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData / limitValue),
            totalData
          }
          success(res, result.rows, 'success', 'get all recipe success', pagination)
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'get all recipe failed')
        })
    } catch (error) {
      failed(res, error.message, 'failed', 'internal server error')
    }
  },
  detailRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const result = await recipeModel.selectDetail(id)
      success(res, result.rows[0], 'success', 'get detail recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get detail recipe failed')
    }
  },
  insertRecipe: async (req, res) => {
    try {
      const fileName = req.file.filename
      // console.log(fileName)
      const userId = req.APP_DATA.tokenDecoded.id
      // console.log(userId)
      const { title, ingredients, video } = req.body

      const result = await recipeModel.store(fileName, title, ingredients, video, userId)
      success(res, result.rows, 'success', 'insert recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'insert recipe failed')
    }
  },
  updateRecipe: async (req, res) => {
    try {
      const recipeId = req.params.id
      const userId = req.APP_DATA.tokenDecoded.id
      const fileName = req.file.filename

      const recipeDetail = await recipeModel.selectDetail(recipeId)

      if (fileName) {
        deleteFile(`public/${recipeDetail.rows[0].photo}`)
      }

      const { title, ingredients, video } = req.body

      const result = await recipeModel.update(recipeId, fileName, title, ingredients, video, userId)
      success(res, result.rows, 'success', 'update recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'update recipe failed')
    }
  },
  softDelete: async (req, res) => {
    try {
      const id = req.params.id

      const statusrecipe = await recipeModel.CheckStatusActiverecipe(id)
      const statusrecipes = (statusrecipe.rows[0].is_active === 1) ? 0 : 1

      const result = await recipeModel.softDelete(id, statusrecipes)
      success(res, result.rows, 'success', 'active or non active recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'active or non active recipe failed')
    }
  },
  destroy: async (req, res) => {
    try {
      const id = req.params.id
      const userId = req.APP_DATA.tokenDecoded.id
      const checkId = await recipeModel.selectDetail(id)
      const file = checkId.rows[0].photo
      if (file) {
        deleteFile(`public/${file}`)
      }
      const result = await recipeModel.destroy(id, userId)
      success(res, result.rows, 'success', 'delete recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'delete recipe failed')
    }
  },
  recipeByUser: async (req, res) => {
    try {
      const { searchName } = req.query
      const search = (typeof searchName === 'undefined') ? '' : searchName
      const result = await recipeModel.recipeByUser(search)
      success(res, result.rows, 'success', 'get recipe by user success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get recipe by user failed')
    }
  },
  MyRecipe: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id
      const result = await recipeModel.MyRecipe(userId)
      success(res, result.rows, 'success', 'get detail my recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get detail my recipe failed')
    }
  },
  recipePublic: async (req, res) => {
    try {
      // const pageValue = page ? Number(page) : 1
      // const limitValue = limit ? Number(limit) : 5
      // const offsetValue = (pageValue - 1) * limitValue

      // const allData = await recipeModel.allDataRecipePublic()
      // // hitung record tabel recipe
      // const totalData = Number(allData.rows[0].total)
      // console.log(totalData)
      // allDataRecipePublic
      const result = await recipeModel.recipePublic()
      // .then((result)=>{
      //   // informasi pagination
      //   const pagination = {
      //     currentPage: pageValue,
      //     dataPerPage: limitValue,
      //     totalPage: Math.ceil(totalData / limitValue),
      //     totalData
      //   }
      success(res, result.rows, 'success', 'get detail my recipe success')
      // })
      // .catch((err)=>{
      //   failed(res, err.message, 'failed', 'get detail my recipe failed.')
      // })
    } catch (err) {
      failed(res, err.message, 'failed', 'get detail my recipe failed')
    }
  }
}

module.exports = recipeController
