var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')
var multer = require('multer')
var uploader = multer({ dest: '/uploads/' })

var checkLogin = require('../middlewares/checkLogin')

router.use(checkLogin.request)

router.get('/', userController.users)

router.post('/add', uploader.single('image'), userController.addUser)
router.post('/edit', uploader.single('image'), userController.editUser)

router.post('/delete', userController.deleteUser)

module.exports = router