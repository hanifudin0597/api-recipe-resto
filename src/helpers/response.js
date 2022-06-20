module.exports = {
  success: (res, data, status, message, pagination) => {
    if (pagination) {
      res.json({
        code: 200,
        status,
        data,
        message,
        pagination,
        error: null
      })
    } else {
      res.json({
        code: 200,
        status,
        data,
        message,
        error: null
      })
    }
  },
  failed: (res, error, status, message) => {
    res.json({
      code: 500,
      status,
      data: null,
      error,
      message
    })
  },
  successWithToken: (res, token, status, message) => {
    res.json({
      code: 200,
      status,
      token,
      message
    })
  }
}
