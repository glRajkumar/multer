const express = require('express')
const router = express.Router()
const upload = require('./upload')

router.post('/' , upload.array("multiple", 20) , (req, res, next)=>{
    const files = req.files
    const url = `http://localhost:8000/upload/`
    // const url = `${req.protocol}://${req.get("host")}`
    const list = []

    for(let i = 0; i < files.length; i++){
        list.push(url + files[i].filename)
    }

    if (!files) {
        const error = new Error("Please upload a file")
        return next(error)
    } else {
        res.json({files, listUrl: list})
    }
})

module.exports = router