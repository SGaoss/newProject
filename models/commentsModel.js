const conn = require('./baseDB')

module.exports = {
  getCommentsDataByPage(currentPage,callback){
    let pageSize = 10
    let offset = (currentPage - 1) * pageSize

    let sql = 'select c.id,c.author,c.content,c.created,c.status,p.title from comments as c left join posts as p on c.post_id=p.id order by id desc limit ? offset ?;select count(*) as totalCount from comments';

    conn.query(sql,[pageSize,offset],(err,results)=>{
      if(err) return callback(err)

      console.log(results);
      
      callback(null,results)
    })
  },
   delCommentsById(id, callback) {
  
     let sql = 'delete from comments where id = ?'

     conn.query(sql, [id], (err, results) => {
       if (err) return callback(err)

       callback(null)
     })
   }
}