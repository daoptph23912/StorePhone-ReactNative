var express = require('express')
var router = express.Router()
var mess = require('../controllers/mess')
var checkLogin = require('../middlewares/checkLogin')

router.use(checkLogin.request)
router.get('/mes', checkLogin.request, mess.mess)

module.exports = router