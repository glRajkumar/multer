const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './upload/')
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    } 
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true)
    }else{
        cb(new Error("not allowed"), false)
    }
}
 
const upload = multer({storage, fileFilter}).single("img")

router.post('/' , async (req, res)=>{
    try {     
     upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        res.json({img : req.file})   
        // res.json({url : `http://localhost:800${req.file.filename}`, image: res.req.file.path, fileName: res.req.file.filename})
    })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router