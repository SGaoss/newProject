// 此模块是categories分类模块的控制器

// 引入model模块
const categoriesModel = require('../models/categoriesModel')

module.exports = {
  // 显示分类页面
  showCategoriesPage(req, res) {
    
    res.render('categories', {isLogin: req.session.isLogin})
  },
  // 获取分类页面中动态渲染的全部数据
  getCategoriesData(req, res) {
    // 1. 调用model中的方法来获取数据
    categoriesModel.getCategoriesData((err, results) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })

      res.json({
        "code": 0,
        "msg": "查询成功",
        "data": results
      })
    })
  },
  // 添加分类数据
  addCategories(req, res) {
    // 1. 接收发送过来的数据
    let categories = req.body
    // console.log(categories);

    // 2. 调用model中的方法进行添加 
    categoriesModel.addCategories(categories, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "添加失败"
      })

      res.json({
        "code": 0,
        "msg": "添加成功"
      })
    })
  },
  // 根据id删除数据
  delCategoriesById(req, res) {
    // 1. 获取传递过来的id
    let {
      id
    } = req.query

    // 2. 调用model中的方法来删除数据
    categoriesModel.delCategoriesById(id, result => {
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
  // 根据id获取分类信息
  getCategoriesInfoById(req, res) {
    // 1. 接收提交过来的数据
    let {id} = req.query

    // 2. 调用model中的方法实施查询
    categoriesModel.getCategoriesInfoById(id, (err, result) => {
      if (err) return res.json({
        "code": 1,
        "msg": "查询失败"
      })

      res.json({
        "code": 0,
        "msg": "查询成功",
        "data": result
      })
    })
  },
  // 根据id更新分类信息
  updateCategoriesInfoById(req, res) {
    // 1. 获取传递过来的数据
    let categories = req.body

    // 2. 调用model中的方法进行更新
    categoriesModel.updateCategoriesInfoById(categories, result => {
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
  delMoreCategoriesInfoByIds(req, res) {
    // 1. 接收传递过来的数据,调用model中的方法进行数据的操作
    var {
      ids
    } = req.query;
    // console.log(ids);
    categoriesModel.delMoreCategoriesInfoByIds(ids, result => {
      if (result) return res.json({
        "code": 1,
        "msg": "批量删除失败"
      })

      res.json({
        "code": 0,
        "msg": "批量删除成功"
      })

    })
  }
}