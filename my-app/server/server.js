const express = require('express')
const userRouter = require('./User')

const app = express()

app.use('/user', userRouter)

app.listen(9093, function(){
  console.log('Node app start at port 9093')
})