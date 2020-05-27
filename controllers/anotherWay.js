const express = require('express')
const router = express.Router()
const upload = require('./upload')

// const upload = multer({storage, fileFilter}).single("img")

const AnotherWay = upload.single('img')

router.post('/' , async (req, res)=>{
    try {     
     AnotherWay(req, res, err => {
        if (err) return res.json({ success: false, err })
        res.json({img : req.file, url : `http://localhost:8000/upload/${req.file.filename}`})   
    })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router

//previously saved as saveInServer.js
//corresponding react file is SaveInServer.js