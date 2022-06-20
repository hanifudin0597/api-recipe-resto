/* eslint-disable no-unused-vars */
const { success, failed, successWithToken } = require('../helpers/response')
const bcrypt = require('bcrypt')
const authModel = require('../models/auth.model')
const jwtToken = require('../helpers/generateJwtToken')

const authController = {
  registerAccount: async (req, res) => {
    // tangkap semua parameter dari body
    const fileName = req.file.filename
    // console.log(fileName)
    const { name, email, phone, password } = req.body

    // ambil data email sesuai parameter yang dikirim dari body
    const checkData = await authModel.checkEmail(email)
    // cek apakah email yang sama terdapat (yang saya cek di rowCount yang mana jika ada yang sama nilai lebih dari 0)
    const checkEmail = checkData.rowCount

    // kondisi cek email
    if (checkEmail > 0) {
      failed(res, 'Email already exists', 'failed', 'Failed to register')
    } else {
      // untuk hash password parameter dari body
      bcrypt.hash(password, 10, (err, hash) => {
        // kondisi jika gagal masuk ke if dan jika berhasil langsung masuk variabel hash
        if (err) {
          failed(res, err.message, 'Failed', 'failed hash password')
        }

        // bikin token untuk verify email
        // const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // let token = '';
        // for (let i = 0; i < 25; i++) {
        //   token += characters[Math.floor(Math.random() * characters.length)];
        // }

        // kirim parameter dan value ke database lewat model Auth
        authModel.storeRegister(name, email, phone, hash, fileName)
          // respon dari database ditangkap di then and catch
          .then((result) => {
            success(res, result, 'success', 'register success')
          })
          .catch((err) => {
            failed(res, err.message, 'failed', 'failed to register')
          })
      })
    }
  },
  loginAccount: async (req, res) => {
    // tangkap isi parameter di body
    const { email, password } = req.body
    // kirim parameter inputan email ke database melalui model
    authModel.checkUsername(email)
      // tangkap hasilnya
      .then((result) => {
        // console.log(result.rows[0].is_verified)
        // if(result.rows[0].is_verified===0){
        //   failed(res, 'email not verified','failed to login','Please Verify Your Email')
        // }
        // else{

        // }
        // bikin kondisi untuk mengecek apakah email ada? | disini pakai rowcount karena jika lebih dari 0 maka terdapat datanya
        if (result.rowCount > 0) {
          // jika ada maka bikin compare dari password (input dari user) dengan password yang telah di hash
          bcrypt.compare(password, result.rows[0].password)
            // tangkap hasilnya
            .then(async (match) => {
              // bikin kondisi jika benar maka true dan jika salah maka false (ini sudah ada di dokumentasi bcrypt bahwa hasil true/false ditangkap oleh then)
              if (match) {
                const token = await jwtToken(result.rows[0])
                success(res, { token, user: result.rows[0] }, 'success', 'Login success')
              } else {
                failed(res, null, 'failed', 'username atau password salah')
              }
            })
        } else {
          failed(res, null, 'failed', 'username atau password salah')
        }
      })
      .catch((err) => {
        failed(res, err.message, 'failed', 'internal server error')
      })
  }
}

module.exports = authController
