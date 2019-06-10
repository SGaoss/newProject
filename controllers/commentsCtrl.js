const commentsModel = require('../models/commentsModel')

module.exports = {
  showCommentsPage(req,res){
    res.render('comments',{isLogin:req.session.isLogin})
  },
  getCommentsDataByPage(req,res){
    let currentPage = req.query.currentPage
    currentPage = currentPage ? currentPage : 1

    commentsModel.getCommentsDataByPage(currentPage,(err,result)=>{
       if (err) return res.json({
         "code": 1,
         "msg": "查询评论失败"
       })
       // console.log(result);
       res.json({
         "code": 0,
         "msg": "查询评论成功",
         "data": result[0],
         "totalPages": Math.ceil(result[1][0].totalCount / 10)  //总页数
       })
    })
  },
  delCommentsById(req,res){
    let {id} = req.query
    commentsModel.delCommentsById(id,result=>{
       if (result) return res.json({
         "code": 1,
         "msg": "删除评论失败"
       })

       res.json({
         "code": 0,
         "msg": "删除评论成功"
       })
    })
  }
}