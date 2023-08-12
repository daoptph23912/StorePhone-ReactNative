var productModel = require('../../models/product.model')
var categoryModel = require('../../models/category.model')
var orderModel = require('../../models/order.model')
var favoriteOrderModel = require('../../models/favoriteOrder.model')
const userModel = require('../../models/user.model')

exports.getFavoriteOrder = async (req, res, next) => {
    let userId = req.params.userId
    let token = req.body.token

    let user = await userModel.findOne({ _id: userId })

    if (token == user.token) {

        let favoriteList = await favoriteOrderModel.find({ userId }).sort({ updatedAt: -1 })
        return res.status(200).json(favoriteList)
    } else {
        return res.status(400).json({})
    }
}

exports.addFavoriteOrder = async (req, res, next) => {
    let userId = req.params.userId
    let token = req.body.token

    let user = await userModel.findOne({ _id: userId })

    if (token == user.token) {
        let orderName = req.body.orderName
        let createdAt = (new Date()).getTime()

        let favoriteOrderObj = new favoriteOrderModel()
        favoriteOrderObj.userId = userId
        favoriteOrderObj.name = orderName
        favoriteOrderObj.createdAt = createdAt
        favoriteOrderObj.updatedAt = createdAt
        favoriteOrderObj.products = []

        let obj = await favoriteOrderObj.save()

        return res.status(200).json(obj)
    } else {
        return res.status(400).json({})
    }
}

exports.deleteOrderFavorite = async (req, res, next) => {
    let userId = req.params.userId
    let token = req.body.token

    let user = await userModel.findOne({ _id: userId })

    if (token == user.token) {
        let orderId = req.body.orderId
        console.log(orderId)
        await favoriteOrderModel.findOneAndDelete({ _id: orderId })
        return res.status(200).json({})
    } else {
        return res.status(400).json({})
    }
}

exports.addProductToOrderFavorite = async (req, res, next) => {

    const userId = req.params.userId
    const token = req.body.token

    const user = await userModel.findById(userId)

    if (user && user.token == token) {
        let productId = req.body.productId
        const product = await productModel.findById(productId)
        const arrayOrderId = req.body.arrayOrderId
        console.log(arrayOrderId)
        const listOrder = await favoriteOrderModel.find({ _id: { $in: arrayOrderId } })

        listOrder.forEach(item => {
            let isContain = item.products.find(i => i.product._id == productId)
            if (!isContain) {
                item.products.push({
                    product,
                    quantity: 1
                })
            }
        })

        const updateOperations = listOrder.map(order => {
            return {
                updateOne: {
                    filter: { _id: order._id },
                    update: { $set: { products: order.products } }
                }
            }
        })

        const result = await favoriteOrderModel.bulkWrite(updateOperations)

        console.log(result)

        return res.status(200).json({})
    } else {

        console.log('token false')
        return res.status(400).json({})
    }
}

exports.updateFavoriteOrder = async (req, res, next) => {

    const userId = req.params.userId
    const token = req.body.token

    const user = await userModel.findById(userId)

    if (user && user.token == token) {
        const order = req.body.order

        await favoriteOrderModel.updateOne({ _id: order._id }, order)

        return res.status(200).json({})
    } else {
        console.log('token false')
        return res.status(400).json({})
    }
}