const express = require('express')
const router = express.Router()
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

//to make it easy
Grid.mongo = mongoose.mongo
let gfs;

// mongoose.connection.once('open', () => {
//   // Init stream
//   const db = mongoose.connection.db
//   const driver = mongoose.mongo
//   gfs = Grid(db, driver);
//   gfs.collection('uploads');
// });

mongoose.connection.once('open', () => {
  // Init stream
  const db = mongoose.connection.db
  gfs = Grid(db)
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  // url: process.env.MONGODB_URI,
  db : mongoose.connection,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.post('/single', upload.single('sin_gfs'), (req, res) => {
  res.json({ file: req.file });
});

router.post('/multiple', upload.array('mul_gfs'), (req, res) => {
  res.json({ files: req.files });
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

//Get the Multiple images
router.post('/images', (req, res) => {
  let names = req.body.names
  console.log(names)
  
  gfs.files.find().where('filename').in(names).exec((err, files) => {
    if(err) console.log(err)
    res.send(files)
  
    // if (!file || file.length === 0) {
    //   return res.status(404).json({ err: 'No file exists' });
    // }
    // if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    //   // Read output to browser
    //   const readstream = gfs.createReadStream(file.filename);
    //   readstream.pipe(res);
    // } else {
    //   res.status(404).json({ err: 'Not an image' });
    // }
  });
});

//delete the image
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.send("updated successfully");
  });
});

module.exports = router