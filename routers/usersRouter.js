const express = require('express')
const usersCtrl = require('../controllers/usersCtrl')

const router = express.Router()

router.get('/users',usersCtrl.showUserPage)
  .get('/getAllUserData',usersCtrl.getAllUserData)
  .post('/addUser',usersCtrl.addUser)
  .get('/delUser',usersCtrl.delUserById)
  .get('/EditUser',usersCtrl.getUserById)
  .post('/updateUser',usersCtrl.updateUser)
  .get('/delMoreUsers',usersCtrl.delMoreUsersByIds)
  .get('/profile',usersCtrl.showProfilePage)
  .post('/updateProfileInfo',usersCtrl.updateProfileInfoById)
  .get('/passwordReset', usersCtrl.showPasswordResetPage)
  .post('/validateOldPassword',usersCtrl.validateOldPasswordById)
  .post('/updateProfilePassword', usersCtrl.updateProfilePasswordById)
  .post('/up;oadFileOfProfile',usersCtrl.uploadFileOfProFile)
module.exports = router