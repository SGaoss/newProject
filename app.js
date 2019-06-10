const express = require('express')
const session = require('express-session')
const fs = require('fs')
const path = require('path')

const bodyParser = require('body-parser')

var app = express()

app.set('view engine','ejs')
app.set('views','./views')

app.use('/static',express.static('static'))
app.use('/assets',express.static('assets'))

app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
  secret: 'keyboard cat', // 加密方式  
  resave: false, // 是否存储到某些存储区，比如说数据库 或磁盘文件等
  saveUninitialized: false // 是否要将初始化的sessionID数据传递给浏览器
}))

app.listen(3003,()=>{
  console.log('server is running at http://127.0.0.1:3003'); 
})


fs.readdir(path.join(__dirname,'./routers'),(err,data)=>{
  data.forEach(item=>{
    app.use(require(`./routers/${item}`))
  })
})