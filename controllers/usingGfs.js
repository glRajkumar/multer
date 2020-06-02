const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const upload = require('./GFupload')
const Grid = require('gridfs-stream')

//to make it easy
Grid.mongo = mongoose.mongo
let gfs;

mongoose.connection.once('open', () => {
  // Init stream
  const db = mongoose.connection.db
  gfs = Grid(db)
  gfs.collection('uploads');
});

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
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      res.status(404).json({ err: 'No files exist', files: false });
    } 
    res.json({ files })
  })
});

//Get the Single image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename : req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not an image' });
    }
  });
});

module.exports = router