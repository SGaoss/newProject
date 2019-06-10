const mysql = require('mysql')


let conn = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database:'baixiu1',
  dateStrings: true, // 将数据库中的时间以字符串的类型来读取并返回,不要改成javascript Date类型
  multipleStatements: true
})

conn.connect()

module.exports = conn