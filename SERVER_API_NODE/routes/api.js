var express = require('express')
var router = express.Router()
var productApi = require('../controllers/api/product.api')
var userApi = require('../controllers/api/user.api')
var orderApi = require('../controllers/api/order.api')

// lấy danh sách sản phẩm
router.get('/products', productApi.getProducts)
// update sản phẩm với id
router.post('/products/:id', productApi.updateProduct)

// lấy danh sách sản phẩm yêu thích với userId
router.post('/products/favorite/:userId', productApi.getFavoriteProduct)

// lấy sản phẩm phổ biến
router.get('/products/populate', productApi.getPopulateProduct)

//lấy danh sách thể loại
router.get('/categories', productApi.getCategories)

// lấy user với id
router.get('/users/:userId', productApi.getUserWithId)

//lấy hóa đơn với userId
router.post('/orders/get/:userId', productApi.getOrderWithUser)
//thanh toán hóa đơn
router.post('/orders/:userId', productApi.postOrder)

// láy giỏ hàng yêu thích
router.post('/orders/favorite/:userId', orderApi.getFavoriteOrder)
router.post('/orders/favorite/add/:userId', orderApi.addFavoriteOrder)
router.post('/orders/favorite/delete/:userId', orderApi.deleteOrderFavorite)
router.post('/orders/favorite/addProduct/:userId', orderApi.addProductToOrderFavorite)
router.post('/orders/favorite/update/:userId', orderApi.updateFavoriteOrder)


router.post('/login', userApi.login)
router.post('/register', userApi.register)

module.exports = router