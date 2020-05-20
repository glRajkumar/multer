const multer = require('multer')

//first model
// const upload = multer({dest: '/upload/'})

//   ---  check file type  ---   (You can add seperate function or include it in multer.diskStorage)
// function check(file, cb){
// const filetype = /jpeg|jpg|png|gif/
// const extname = filetype.test(path.extname(file.originalname).toLowerCase())
// if(extname){
//     return cb(null, true)
// }else{
//     return cb("Images only allowed")
// }
// } 

//   ---      Warning      ---
//Windows not allow you to save file name with :
//if you use new Date().toISOString() , it will give time with :
//so change it as new Date().toISOString().replace(/:/g, "-")
//or use simple date format like Date.now()


const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './upload/')
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    } 
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        cb(null, true)
    }else{
        cb(new Error("not allowed"), false)
    }
}
 
const upload = multer({storage, fileFilter})

module.exports = upload