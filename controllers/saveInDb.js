const express = require('express')
const router = express.Router()
const fs = require('fs')
const Image = require('../models/Image')
const upload = require('./upload')

router.post('/getsingle' , (req, res)=>{
    let id = req.body.id

    Image.findOne({"_id" : id})
    .then((img)=>{
        res.contentType('json')
        // res.append("Content-Length", img.img.contentSize)
        // res.setHeader()
        res.header("Content-Length", img.img.contentSize)
        res.send(img)
    })
    .catch((err)=> console.log(err))
})

router.post('/getmultiple' , (req, res)=>{
    let ids = req.body.ids

    Image.find().where('_id').in(ids).exec((err, imgs)=>{
        if(err) console.log(err)
        res.send(imgs)
    })
})

router.post('/single' , upload.single("single") , async (req, res, next)=>{
    const file = req.file

    try{
        if (!file) {
            const error = new Error("Please upload a file")
            return next(error)
        } 
        const newImg = new Image
        newImg.img.data = fs.readFileSync(req.file.path)
        newImg.img.contentType = file.mimetype
        newImg.img.contentSize = file.size 
        await newImg.save()
        let id = newImg._id

        res.json({ id, success : true })
    }catch(err){
        console.log(err)
    }
})

router.post('/multiple' , upload.array("multiple", 20) , async (req, res, next)=>{
    const files = req.files
    const len = files.length
    const ids = []

    try {
        if (!files) {
            const error = new Error("Please upload a file")
            return next(error)
        } else {
            for(let i = 0; i < len; i++){
                const newImg = new Image
                newImg.img.data = fs.readFileSync(files[i].path)
                newImg.img.contentType = files[i].mimetype 
                newImg.img.contentSize = files[i].size 
                await newImg.save()
                let id = newImg._id        
                ids.push(id)
            }
        
            res.json({ ids, success : true })
        }            
    } catch (err) {
        console.log(err)        
    }
})

module.exports = router