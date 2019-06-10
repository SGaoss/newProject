const express = require('express')

const uploadFileCtrl = require('../controllers/uploadFileCtrl')

const router = express.Router()

router.post('/uploadFile',uploadFileCtrl.uploadFile)

module.exports = router