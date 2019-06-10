const express = require('express')
const indexCtrl = require('../controllers/indexCtrl')

const router = express.Router()

router.get('/',indexCtrl.showIndexPage)

module.exports = router