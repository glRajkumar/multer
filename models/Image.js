const mongoose = require('mongoose')

const Image = mongoose.model('Image', {
    img : {
        type : Array
    }
})

// use Array or String for small size

module.exports = Image