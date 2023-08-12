var db = require('./db')
var productSchema = require('./schemas/product.shema')

const favoriteOrderSchemal = new db.mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        products: {
            type: [{
                product: { type: productSchema, required: true },
                quantity: { type: Number, required: true }
            }], required: false, default: []
        },
        createdAt: { type: Number, required: false },
        updatedAt: { type: Number, required: false }
    },
    {
        collection: 'FavoriteOrders'
    }
)
let favoriteOrderModel = db.mongoose.model('favoriteOrderModel', favoriteOrderSchemal)
module.exports = favoriteOrderModel