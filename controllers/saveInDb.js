const express = require('express')
const router = express.Router()
const Image = require('../models/Image')
const upload = require('./upload')

router.post('/single' , upload.single("single") , async (req, res, next)=>{
    const file = req.file

    try{
        if (!file) {
            const error = new Error("Please upload a file")
            return next(error)
        } 
        const img = new Image({img: file})
        await img.save()    
        res.json({file, img})   
    }catch(err){
        console.log(err)
    }
})

router.post('/multiple' , upload.array("multiple", 20) , async (req, res, next)=>{
    const files = req.files
    
    try {
        if (!files) {
            const error = new Error("Please upload a file")
            return next(error)
        } else {
            const img = new Image({img: files})
            await img.save()        
            res.json({files, img})
        }            
    } catch (err) {
        console.log(err)        
    }
})

module.exports = router