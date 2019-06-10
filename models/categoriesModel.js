// 1. 引入封装好的模块
const conn = require('./baseDB')

// 2. 暴露数据
module.exports = {
  // 获取所有的分类数据
  getCategoriesData(callback) {
    var sql = "select * from categories where isDel = 0"
    conn.query(sql, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  // 添加分类
  addCategories(categories, callback) {
    var sql = "insert into categories set ?";
    conn.query(sql, categories, (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },
  // 根据id删除数据
  delCategoriesById(id, callback) {
    let sql = "update categories set isDel = 1 where id = ?"
    conn.query(sql, id, (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },
  // 根据id查询分类数据
  getCategoriesInfoById(id, callback) {
    var sql = "select * from categories where id = ?"
    conn.query(sql, id, (err, results) => {
      if (err) return callback(err)

      callback(null, results)
    })
  },
  // 根据id更新分类信息
  updateCategoriesInfoById(categories, callback) {
    // 1. 获取id
    let {
      id
    } = categories

    // 2. 删除id,因为id不更新
    delete categories.id

    // 3. 调用方法删除数据
    var sql = "update categories set ? where id = ?"
    conn.query(sql, [categories, id], (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  },
  delMoreCategoriesInfoByIds(ids, callback) {
    // 使用参数化的方式来批量删除
    let sql = "update categories set isDel = 1 where id in (?)"
    conn.query(sql, [ids], (err, results) => {
      if (err) return callback(err)

      callback(null)
    })
  }
}