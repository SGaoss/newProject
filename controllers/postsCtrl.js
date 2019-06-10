const postsModel = require('../models/postsModel')
const uploadFileCtrl = require('./uploadFileCtrl')

module.exports = {
  showPostaddPage(req, res) {

    postsModel.getCategoriesData((err, results) => {
      if (err) return res.send('404')
      console.log(results);
      res.render('post-add', {
        data: results,
        isLogin: req.session.isLogin
      })
    })
  },
  addNewPost(req, res) {
    let post = req.body

    post.category_id = post.category
    post.user_id = req.session.user.id
    delete(post.category)

    postsModel.addNewPost(post, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "添加失败"
      })

      res.json({
        "code": 0,
        "msg": "添加文章成功"
      })
    })
  },
  showPostsPage(req, res) {
    res.render('posts', {
      isLogin: req.session.isLogin
    })
  },
  getAllPostsData(req, res) {

    // 获取传递过来的当前页码
    let currentPage = req.query.currentPage
    currentPage = currentPage ? currentPage : 1;
    // if(currentPage){
    //   currentPage = currentPage
    // }else {
    //   currentPage = 1
    // }
    // if(!currentPage){
    //   currentPage = 1
    // }
    // 1. 调用model中的方法获取数据
    // postsModel.getAllPostsData(1,(err,results)=>{
    postsModel.getAllPostsData(currentPage, (err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "获取数据失败"
      })

      res.json({
        "code": 0,
        "msg": "获取数据成功",
        "data": results[0],
        "count": results[1][0].totalCount
      })
    })
  },
  delPostById(req,res){
    let {id} = req.query
    postsModel.delPostById(id,result=>{
      if (result) return res.json({
        "code": 1,
        "msg": "删除失败"
      })

      res.json({
        "code": 0,
        "msg": "删除成功"
      })
    })
  },
  getAllPostsData(req,res){
    let currentPage = req.query.currentPage

    currentPage = currentPage?currentPage:1

    postsModel.getAllPostsData(currentPage,(err,results)=>{
      if(err) return res.json({
          "code": 1,
          "msg": "获取数据失败"
      })
      res.json({
        "code": 0,
        "msg": "获取数据成功",
        "data": results[0],
        "count": results[1][0].totalCount
      })
    })
  },
  showEditPostsPage(req,res){
    let {id} = req.query

    postsModel.getPostsDataById(id,(err,result)=>{
      if(err) return res.send('404')
      console.log(result);
      
      res.render('editPosts',{isLogin:req.session.isLogin,...result[0][0],categories:result[1]})
    })
  },
  updatePostsById(req,res){
    let post = req.body
        console.log(post);

    post.user_id = req.session.user.id
    post.category_id = post.category
    delete post.category

    postsModel.updatePostsById(post,result=>{
      if(result) return res.json({
        "code":1,
        "msg": "更新文章失败"
      })
        res.json({
          "code": 0,
          "msg": "更新文章成功"
        })
    })
  }
}