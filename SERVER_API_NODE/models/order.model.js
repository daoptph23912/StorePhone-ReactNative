var db = require('./db')
var productSchema = require('./schemas/product.shema')

const orderSchemal = new db.mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: {
            type: [{
                product: { type: productSchema, required: true },
                quantity: { type: Number, required: true }
            }], required: true
        },
        createdAt: { type: Number, required: true },
        status: { type: Number, required: true, default: "processing" }
    },
    {
        collection: 'Orders'
    }
)
let orderModel = db.mongoose.model('orderModel', orderSchemal)
module.exports = orderModel