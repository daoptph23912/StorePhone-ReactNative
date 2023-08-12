var express = require('express')
var router = express.Router()
var categoryController = require('../controllers/categoryController')
var checkLogin = require('../middlewares/checkLogin')

router.use(checkLogin.request)

router.get('/', categoryController.category)

router.post('/edit', categoryController.edit)
router.post('/add', categoryController.add)

router.post('/delete', categoryController.delete)

module.exports = router