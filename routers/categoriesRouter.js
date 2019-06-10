// 1. 引入模块
const express = require('express')

const categoriesCtrl = require('../controllers/categoriesCtrl')

// 2. 创建路由对象
const router = express.Router()

// 3. 添加路由
router.get('/categories', categoriesCtrl.showCategoriesPage) // 显示分类页面
  .get('/getCategoriesData', categoriesCtrl.getCategoriesData) // 获取所有的分类数据
  .post('/addCategories', categoriesCtrl.addCategories) // 添加分类信息
  .get('/delCategories', categoriesCtrl.delCategoriesById) // 根据id删除数据
  .get('/editCategories', categoriesCtrl.getCategoriesInfoById) // 根据id获取当前的那条分类信息
  .post('/updateCategories', categoriesCtrl.updateCategoriesInfoById) // 根据id更新分类数据
  .get('/delMoreCategoriesInfo', categoriesCtrl.delMoreCategoriesInfoByIds) // 根据传入过来的多个id来删除分类数据
// 4.  向外暴露对象
module.exports = router