const userModel = require('../models/user.model')
const { success, failed } = require('../helpers/response')

const userController = {
  list: async (req, res) => {
    try {
      // tangkap semua variabel / parameter yang di kirim lewat query params
      const { sortField, sortType, page, limit } = req.query
      const sortByField = sortField || 'name'
      const sortByType = sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC'

      // proses pagination
      const pageValue = page ? Number(page) : 1
      const limitValue = limit ? Number(limit) : 5
      const offsetValue = (pageValue - 1) * limitValue

      // panggil semua data dan dihitung semua record dalam tabel users
      const allData = await userModel.allData()
      // hitung record table users
      const totalData = Number(allData.rows[0].total)
      // kirim semua variabel/parameter ke model
      userModel.selectAll(sortByField, sortByType, limitValue, offsetValue)
        .then((result) => {
          // bikin object untuk menampilkan data pagination
          const pagination = {
            currentPage: pageValue,
            dataPerPage: limitValue,
            totalPage: Math.ceil(totalData / limitValue),
            totalData
          }
          // response standar yang diambil dari helpers/response
          success(res, result.rows, 'success', 'get all user success', pagination)
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'get all users failed')
        })
    } catch (error) {
      failed(res, error.message, 'failed', 'internal server error')
    }
  },
  detailUser: async (req, res) => {
    try {
      // tangkap url params berupa id
      const id = req.params.id
      // kirim semua variabel/parameter ke model
      const result = await userModel.selectDetail(id)
      success(res, result.rows[0], 'success', 'get detail user success')
    } catch (err) {
      failed(res, err.message, 'failed', 'failed get detail user')
    }
  },
  insert: async (req, res) => {
    try {
      const { name, email, phone, password, photo } = req.body
      const result = await userModel.store(name, email, phone, password, photo)
      success(res, result.rows, 'success', 'insert user success')
    } catch (err) {
      failed(res, err.message, 'failed', 'failed to insert')
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const { name, email, phone, password, photo } = req.body
      const result = await userModel.update(id, name, email, phone, password, photo)
      success(res, result.rows, 'success', 'update user success')
    } catch (err) {
      failed(res, err.message, 'failed', 'failed to update')
    }
  },
  // destroy: async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const result = await userModel.destroy(id)
  //     success(res, result.rows, 'success', 'delete user success')
  //   } catch (err) {
  //     failed(res, err.message, 'failed', 'failed to delete')
  //   }
  // },
  softDeleteUser: async (req, res) => {
    try {
      const id = req.params.id

      const statusUser = await userModel.CheckStatusActiveUser(id)
      const statusUsers = (statusUser.rows[0].is_active === 1) ? 0 : 1

      const result = await userModel.softDeleteUser(id, statusUsers)
      success(res, result.rows, 'success', 'activ or non active user success')
    } catch (err) {
      failed(res, err.message, 'failed', 'activ or non active failed')
    }
  },
  detailUserId: async (req, res) => {
    // const userId = req.APP_DATA.tokenDecoded.id
    try {
      const userId = req.APP_DATA.tokenDecoded.id
      // console.log(userId)

      const result = await userModel.detailUserId(userId)
      success(res, result.rows[0], 'success', 'get detail user success')
    } catch (err) {
      failed(res, err.message, 'failed', 'insert recipe failed')
    }
  }
}

module.exports = userController
