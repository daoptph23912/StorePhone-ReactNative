var db = require('./db')

const productSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        cartId: { type: db.mongoose.Schema.Types.ObjectId, ref: 'categoryModel' },
        price: { type: Number, required: true },
        image: { type: String, required: false },
        quantity: { type: Number, required: true },
        content: { type: String, required: false }
    },
    {
        collection: 'Products',
        versionKey: false
    }
)

module.exports = db.mongoose.model('productModel', productSchema)
