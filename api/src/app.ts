import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import categoryRouter from './routers/category.router'
import productRouter from './routers/product.router'
import userRouter from './routers/user.router'
import adminRouter from './routers/admin.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://squidstore.onrender.com',
      'https://squidstore.vercel.app',
    ],
    credentials: true,
  })
)

app.use(morgan('dev'))
// Make public folder accessable
//app.use('/api/media', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static('public'))
//app.use('/public', express.static(path.resolve('public')))
//app.use(apiContentType)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'Ecommerce Project',
    usersEndpoint: 'https://squidserver.onrender.com/api/users',
    productEndpoint: 'https://squidserver.onrender.com/api/products',
  })
})

// Custom API error handler
app.use(apiErrorHandler)

export default app
