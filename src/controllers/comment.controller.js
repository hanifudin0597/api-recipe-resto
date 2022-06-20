const commentModel = require('../models/comment.model')
const { success, failed } = require('../helpers/response')

const commentController = {
  listComment: async (req, res) => {
    try {
      const { sortField, sortType, page, limit } = req.query
      const sortByField = sortField || 'recipe_id'
      const sortByType = sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC'

      const pageValue = page ? Number(page) : 1
      const limitValue = limit ? Number(limit) : 5
      const offsetValue = (pageValue - 1) * limitValue

      // panggil semua data dan dihitung semua record dalam tabel users
      const allData = await commentModel.allData()
      const totalData = Number(allData.rows[0].total)
      commentModel.selectAll(sortByField, sortByType, limitValue, offsetValue)
        .then((result) => {
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData / limitValue),
            totalData
          }
          success(res, result.rows, 'success', 'get all comment success', pagination)
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'get all comment failed')
        })
    } catch (error) {
      failed(res, error.message, 'failed', 'internal server error')
    }
  },
  detailComment: async (req, res) => {
    try {
      const id = req.params.id
      const result = await commentModel.selectDetail(id)
      success(res, result.rows[0], 'success', 'get all comment success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get detail comment failed')
    }
  },
  insertComment: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id
      const { recipe_id, comment_text } = req.body
      const result = await commentModel.store(recipe_id, comment_text, userId)
      success(res, result.rows[0], 'success', 'insert comment success')
    } catch (err) {
      failed(res, err.message, 'failed', 'insert comment failed')
    }
  },
  updateComment: async (req, res) => {
    try {
      const id = req.params.id
      const userId = req.APP_DATA.tokenDecoded.id
      const { recipe_id, comment_text } = req.body
      const result = await commentModel.update(id, recipe_id, comment_text, userId)
      success(res, result.rows[0], 'success', 'update comment success')
    } catch (err) {
      failed(res, err.message, 'failed', 'update comment failed')
    }
  },
  destroyComment: async (req, res) => {
    try {
      const id = req.params.id
      const result = await commentModel.destroy(id)
      success(res, result.rows[0], 'success', 'delete comment success')
    } catch (err) {
      failed(res, err.message, 'failed', 'delete comment failed')
    }
  },
  commentByRecipe: async (req, res) => {
    try {
      const { searchRecipe } = req.query
      const search = (typeof searchRecipe === 'undefined') ? '' : searchRecipe
      const result = await commentModel.commentByRecipe(search)
      success(res, result.rows[0], 'success', 'get comment by recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get comment by recipe failed')
    }
  },
  MyComment: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id
      const result = await commentModel.MyComment(userId)
      success(res, result.rows, 'success', 'get detail my recipe success')
    } catch (err) {
      failed(res, err.message, 'failed', 'get detail my recipe failed')
    }
  }
}

module.exports = commentController
