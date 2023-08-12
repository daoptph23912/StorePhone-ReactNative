var express = require('express')
var router = express.Router()
var dashboardController = require('../controllers/dashboardController')
var checkLogin = require('../middlewares/checkLogin')

router.use(checkLogin.request)
router.get('/', checkLogin.request, dashboardController.dashboard)

module.exports = router