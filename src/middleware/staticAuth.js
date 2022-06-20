const { failed } = require('../helpers/response')
//
const auth = (req, res, next) => {
  const { token } = req.headers
  if (token && token === '1234567625') {
    next()
  } else {
    failed(res, null, 'failed', 'invalid token')
  }
}
module.exports = auth
