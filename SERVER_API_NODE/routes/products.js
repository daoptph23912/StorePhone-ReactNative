var express = require('express')
var router = express.Router()
var productController = require('../controllers/productController')
var multer = require('multer')
var uploader = multer({ dest: '/uploads/' })

var checkLogin = require('../middlewares/checkLogin')

router.use(checkLogin.request)

router.get('/', productController.products);

router.get('/add', productController.addProduct)
router.post('/add', uploader.single('image'), productController.addProduct)

router.get('/edit/:productId', productController.editProduct)
router.post('/edit/:productId', uploader.single('image'), productController.editProduct)

router.get('/:productId', productController.detailProduct)

router.post('/delete', productController.deleteProduct)

module.exports = router