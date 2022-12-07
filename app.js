require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require("./middleware/error-handler")
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('<h1>Store API</h1> <a href = "/api/v1/products">products</a>')
})

const router = require('./routes/products')
app.use('/api/v1/products', router) //passing router

// ASYNC WRAPPER 
app.use(notFoundMiddleware)
app.use(errorMiddleware)
const connectDB = require('./db/connect')
const start = async()  =>{
    try{
        await connectDB(process.env.CONNECTION)
        app.listen(5000, () => console.log('server is up on port 5000...'))
    }catch(err){
        console.log(err)
    }
}
start()