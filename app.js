require('dotenv').config()
require('./config/database').connect()
const express=require('express')
var morgan = require('morgan')
const auth=require('./middleware/auth')

const indexRouter=require('./routers/index')
const userRouter=require('./routers/user')
const productRouter=require('./routers/product')
const categoryRouter=require('./routers/category')
const cartRouter=require('./routers/cart')
const transactionRouter=require('./routers/transaction')

const app=express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/',indexRouter)
app.use('/users',userRouter)
app.use('/products',auth.onlyAdmin,productRouter)
app.use('/category',auth.onlyAdmin,categoryRouter)
app.use('/carts',auth.onlyCustomer,cartRouter)
app.use('/transactions',auth.verifyToken,transactionRouter)

module.exports=app