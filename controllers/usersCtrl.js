const usersModel = require('../models/usersModel')
const uploadFileCtrl = require('./uploadFileCtrl')

module.exports = {
  showUserPage(req, res) {
     if (!req.session.isLogin) {
       res.redirect('/login') // 跳转到登陆页面
       return
     }
    res.render('users', {isLogin:req.session.isLogin})
  },
  getAllUserData(req, res) {
    usersModel.getAllUserData((err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": '查询失败'
      })
      res.json({
        "code": 0,
        "msg": '查询成功',
        "data": result
      })
    })
  },
  addUser(req, res) {
    let user = req.body
    user.status = "activated"
    user.avatar = "/static/uploads/avatar.jpg"
    usersModel.addUser(user, result => {
      if (result) return res.json({
        "code": 1,
        "msg": '添加失败'
      })
      res.json({
        "code": 0,
        "msg": '添加成功'
      })
    })
  },
  delUserById(req, res) {
    let {
      id
    } = req.query
    usersModel.delUserById(id, result => {
      if (result) return res.json({
        "code": 1,
        "msg": '删除失败'
      })
      res.json({
        "code": 0,
        "msg": '删除成功'
      })
    })
  },
  getUserById(req, res) {
    let {
      id
    } = req.query
    usersModel.getUserById(id, (err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": '查询失败'
      })
      res.json({
        "code": 0,
        "msg": '查询成功',
        "data": result
      })
    })
  },
  updateUser(req, res) {
    let newData = req.body
    usersModel.updateUser(newData, result => {
      if (result) return res.json({
        "code": 1,
        "msg": '更新失败'
      })
      res.json({
        "code": 0,
        "msg": '更新成功',
      })
    })
  },
  delMoreUsersByIds(req, res) {
    var {
      ids
    } = req.query
    // console.log(ids);

    usersModel.delMoreUsersByIds(ids, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "批量删除失败"
      })
      res.json({
        "code": 0,
        "msg": "批量删除成功"
      })
    })
  },
  showProfilePage(req, res) {
    if (!req.session.isLogin) {
      res.redirect('/login')
      return
    }
    let {
      id
    } = req.session.user
    usersModel.getUserById(id, (err, result) => {
      if (err) return res.send('404')
      res.render('profile', result[0])
    })
  },
  updateProfileInfoById(req, res) {
    let profile = req.body
    usersModel.updateProfileInfoById(profile, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "更新失败"
      })

      res.json({
        "code": 0,
        "msg": "更新成功"
      })
    })
  },
  showPasswordResetPage(req, res) {
    if (!req.session.isLogin) {
      res.redirect('/login')
      return
    }
    res.render('password-reset', {})
  },
  validateOldPasswordById(req, res) {
    // 1. 接收post方式传递过来的数据
    // let obj = req.body
    let {
      id,
      password
    } = req.body

    // 2. 调用model中的方法查询数据
    usersModel.getUserById(id, (err, result) => {
      if (err) return res.json({
        "code": 2,
        "msg": "服务器端错误"
      })

      // 如果查询成功的话,要判断密码是否正确
      if (result[0].password == password) {
        res.json({
          "code": 0,
          "msg": "旧密码是正确的"
        })
      } else {
        res.json({
          "code": 1,
          "msg": "旧密码不正确"
        })
      }
    })
  },
  updateProfilePasswordById(req, res) {
    usersModel.updateProfilePasswordById(req.body, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "密码更新失败"
      })

      res.json({
        "code": 0,
        "msg": "密码更新成功"
      })
    })

  },
  uploadFileOfProFile(req,res){
    uploadFileCtrl.uploadFile(req,res,(err,files)=>{
      if(err) return res.json({
         "code": 1,
         "msg": "上传失败"
      })
       res.json({
         "code": 0,
         "msg": "上传成功",
         "src": files.avatar.path
       })
    })
  }
}