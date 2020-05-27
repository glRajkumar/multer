const mongoose = require('mongoose')

const Image = mongoose.model('Image', {
    img : {
        data : Buffer,
        contentType : String,
        contentSize : Number
    }
})

// use Array or String for small size

module.exports = Image