const express = require('express')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
//init app
const app = express()

//set storage engine
const storage = multer.diskStorage({
    destination: './public/upload/userProfile/',
    filename: (req, file, next) =>{
        next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

    //init upload
const upload = multer({
    storage : storage,
    limits: {fileSize: 6000000}
})


app.post('/upload', upload.single('myImage'), (req, res, next) =>{
    const file = req.file
    if(!file){
        return next("error: File not found")
    } 

    res.render('index', {
        msg: 'file uploaded',
        file: `/upload/userProfile/${req.file.filename}`
    })


} )


app.get('/', (req, res) =>{
    res.render('index', {
        file: req.file
    })
})




//setting up view template
const views = path.join(__dirname ,'./views')
app.set('view engine' , 'ejs')
app.set('views', views)

app.use(express.static('./public'))










const port = process.env.PORT || 4000

//setting hoem route
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port ,() => console.log(`server is up on port ${port}`))