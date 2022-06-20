const { JWT_SECRET } = require('../helpers/env')
const jwt = require('jsonwebtoken')
const { failed } = require('../helpers/response')

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers
    const decoded = jwt.verify(token, JWT_SECRET)
    req.APP_DATA = {
      tokenDecoded: decoded
    }
    next()
  } catch (err) {
    failed(res, err, 'failed', 'invalid token')
  }

  // ini untuk cara kedua

  // const {token} = req.headers
  // jwt.verify(token, JWT_SECRET, (err, decoded)=>{
  //     if(err){
  //         failed(res, err, 'failed','invalid token')
  //     }
  //     else{
  //         next()
  //     }
  // })
}
