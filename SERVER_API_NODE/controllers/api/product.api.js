var productModel = require('../../models/product.model')
var categoryModel = require('../../models/category.model')
var orderModel = require('../../models/order.model')
const userModel = require('../../models/user.model')

exports.getProducts = async (req, res, next) => {

    let msg = ''
    let filterCondition = {}
    if (req.query) {
        // if (req.query.cartId) {
        //     filterCondition = { cartId: req.query.cartId }
        // } else {
        //     let firstCategory = await categoryModel.find().limit(1)
        //     filterCondition = { cartId: firstCategory[0]._id }
        // }
    }

    try {
        msg = 'success'
        let listProduct = await productModel.find(filterCondition)
        res.status(200).json({ msg, data: listProduct })
    } catch (err) {
        res.status(204).json({ msg: err.message })
    }
}

exports.getCategories = async (req, res, next) => {

    let msg = ''

    const pipeline = [
        {
            $lookup: {
                from: "Products",
                localField: "_id",
                foreignField: "cartId",
                as: "products",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                numProduct: { $size: "$products" },
                image: 1
            },
        },
    ];

    try {
        msg = 'success'
        let listCategory = await categoryModel.aggregate(pipeline)
        res.status(200).json({ msg, data: listCategory })
    } catch (err) {
        res.status(204).json({ msg: err.message })
    }
}

exports.getOrderWithUser = async (req, res, next) => {

    let userId = req.params.userId
    let token = req.body.token

    let user = await userModel.findOne({ _id: userId })

    if (token == user.token) {
        let orderList = await orderModel.find({ userId }).sort({ createdAt: -1 })

        return res.status(200).json({ data: orderList })
    } else {
        return res.status(401).json({ error: 'Loi' })
    }
}

exports.getPopulateProduct = async (req, res, next) => {

    let populateProductList = await productModel.find().sort({ numOrder: -1 }).limit(6)

    return res.status(200).json({ data: populateProductList })

}

exports.postOrder = async (req, res, next) => {
    let userId = req.params.userId
    let token = req.body.token
    let products = req.body.products

    let user = await userModel.findOne({ _id: userId })

    if (token == user.token) {
        let numOrders = []
        products.forEach((item) => {
            numOrders.push({ _id: item.product._id, numOrder: item.quantity })
        })
        const bulkOps = numOrders.map((item) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { numOrder: item.numOrder } }
            }
        }))
        await productModel.bulkWrite(bulkOps)


        let order = new orderModel()
        order.products = products
        order.userId = userId
        order.createdAt = new Date().getTime()
        order.status = 0
        await order.save()
        return res.status(200).json({})
    } else {
        return res.status(401).json({ error: 'Loi' })
    }
}

exports.updateProduct = (req, res, next) => {
    let userId = req.params.userId
    let token = req.body.token
    let product = req.body.product


}

exports.getUserWithId = async (req, res, next) => {
    let userId = req.params.userId

    let user = await userModel.findOne({ _id: userId })

    if (user) return res.status(200).json({ user })
    res.status(400).json({})
}

exports.getFavoriteProduct = async (req, res, next) => {
    let userId = req.params.userId
    let productIds = req.body.productIds
    let token = req.body.token

    let user = await userModel.findOne({ _id: userId })

    if (token == user.token) {

        let productList = await productModel.find({ _id: { $in: productIds } })

        return res.status(200).json(productList)
    } else {
        return res.status(400).json({})
    }
}