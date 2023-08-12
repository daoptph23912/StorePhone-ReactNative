const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/ProductManagerASM')
    .catch((err) => {
        console.log('Error')
        console.log(err)
    })

module.exports = { mongoose }
// mongodb://localhost:27017/?directConnection=true