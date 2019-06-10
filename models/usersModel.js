const conn = require('./baseDB')

module.exports = {
  getAllUserData(callback){
    var sql = "select * from users where isDel = 0"
    conn.query(sql,(err,results)=>{
      if(err) return callback(err)

      callback(null,results)
    })
  },
  addUser(user,callback){
    var sql = "insert into users set ?"
    conn.query(sql,user,(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  },
  delUserById(id,callback){
    var sql = "update users set isDel = 1 where id = ?"

    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)

     if (results.affectedRows > 0) {
       callback(null)
     }
    })
  },
  getUserById(id,callback){
    var sql = "select * from users where id = ? and isDel = 0"
    conn.query(sql,id,(err,results)=>{
      if(err) return callback(err)

      callback(null,results)
    })
  },
  updateUser(newData,callback){
    let {id} = newData
    delete newData.id
    var sql = "update users set ? where id = ?"
    conn.query(sql,[newData,id],(err,results)=>{
      if(err) return callback(err)
      return callback(null)
    })
  },
  delMoreUsersByIds(ids,callback){
    let sql = "update users set isDel = 1 where id in (?)"
    
    conn.query(sql,[ids],(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  },
  updateProfileInfoById(profile,callback){
    let {id} = profile

    delete profile.id

    let sql = "update users set ? where id = ?"
    conn.query(sql,[profile,id],(err,results)=>{
      if(err) return callback(err)

      callback(null)
    })
  },
   updateProfilePasswordById(obj, callback) {
     // 1. 获取发送过来的数据
     let { id,password} = obj
    console.log(obj);
    
     // 2. 准备sql语句进行更新
     let sql = "update users set password = ? where id = ?"
     conn.query(sql, [password, id], (err, results) => {
       if (err) return callback(err)

       callback(null)
     })
   }
}