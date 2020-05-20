const express = require('express')
const router = express.Router()
const upload = require('./upload')

router.post('/' , upload.single("single") ,(req, res, next)=>{
    const file = req.file
    if (!file) {
        const error = new Error("Please upload a file")
        return next(error)
    } else {
        // res.download(file)
        res.json({file, url : `http://localhost:8000/upload/${req.file.filename}`})
    }
})

module.exports = router