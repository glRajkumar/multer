const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
require('dotenv').config()

const app = express()
connectDB()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get("/", (req,res) => res.send("Hello"))

//to open img in local
app.use('/upload', express.static("upload"))

const single = require('./controllers/single')
const multiple = require('./controllers/multiple')
const saveInDb = require('./controllers/saveInDb')
const usinggfs = require('./controllers/usingGfs')

app.use("/single", single)
app.use("/multiple", multiple)
app.use("/saveInDb", saveInDb)
app.use("/usinggfs", usinggfs)

app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message : error.message || "Internal Server Error"
        }
    })
})

const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`App is running on ${port}`))