const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const upload = require('./GFupload')

const options = {
    bucketName: 'uploads'
}

router.post('/single', upload.single('sin_gfs'), (req, res) => {
  let file = req.file
  res.json({ fileName : file.filename });
});

router.post('/multiple', upload.array('mul_gfs'), (req, res) => {
  let files = req.files
  let names = files.map((file)=> file.filename)
  res.json({ fileNames : names });
});

// Get all Images Stored in DB
router.get('/', (req, res) => {
  const gfB = new mongoose.mongo.GridFSBucket(mongoose.connection.db, options)

  gfB.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      res.status(404).json({ err: 'No files exist', files: false });
    } 
    res.json({ files })
  })
});

//Get the Single image
router.get('/image/:filename', (req, res) => {
  const gfB = new mongoose.mongo.GridFSBucket(mongoose.connection.db, options)

  const d = gfB.openDownloadStreamByName(req.params.filename)

  d.on("data", (chunk)=>{ res.write(chunk) })

  d.on("error", (err)=>{ res.json({err}) })

  d.on("end", ()=>{ res.end() })
});

module.exports = router