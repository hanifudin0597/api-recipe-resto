const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const userRoute = require('./src/router/user.route')
// const recipeRoute = require('./src/router/recipe.route')
// const commentRoute = require('./src/router/comment.route')
const authRoute = require('./src/router/auth.route')
const adminRoute = require('./src/router/admin.route')
const cors = require('cors')
const xss = require('xss-clean')
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(cors())
app.options('*', cors())
app.use(helmet({
  crossOriginEmbedderPolicy: false
}))
app.use(xss())
app.use(bodyParser.json())

app.use(authRoute, adminRoute, userRoute)

// console.log(process.env)
const port = process.env.PORT || 3003

app.listen(port, () => {
  console.log(`Service running on port ${port}`)
})
