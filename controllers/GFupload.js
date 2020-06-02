const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

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
            const fileName = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
            fileName,
            bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
        });
    }
});
  
const upload = multer({ storage });

module.exports = upload