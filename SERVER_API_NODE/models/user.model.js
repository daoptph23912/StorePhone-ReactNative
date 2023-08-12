var db = require("./db")

var userSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String },
        status: { type: String, required: true },
        type: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        collection: 'Users',
        versionKey: false
    }
)

module.exports = db.mongoose.model('userModel', userSchema)