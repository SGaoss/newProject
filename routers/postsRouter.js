const express = require('express')

const postsCtrl = require('../controllers/postsCtrl')

const router = express.Router()

router.get('/post-add',postsCtrl.showPostaddPage)
  .get('/posts',postsCtrl.showPostsPage)
  // .post('/uploadFileOfPostAdd',postsCtrl.uploadFileOfPostAdd)
  .post('/addNewPost', postsCtrl.addNewPost)
  .get('/getAllPostsData',postsCtrl.getAllPostsData)
  .get('/getPaginationData', postsCtrl.getAllPostsData)
  .get('/delPostById',postsCtrl.delPostById)
  .get('/getPostsDataByPage',postsCtrl.getAllPostsData)
  .get('/editposts',postsCtrl.showEditPostsPage)
  .post('/updatePosts',postsCtrl.updatePostsById)
module.exports = router