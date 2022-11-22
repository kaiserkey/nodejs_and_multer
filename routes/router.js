const express = require('express'),
        router = express.Router()
        ImageController  =require('../controllers/ImageController'),
        { upload } = require('../helppers/multerConfig')

    router.get('/', (req,res)=>{
        res.render( 'image')
    })
        .post('/upload', upload.single('image'), ImageController.uploadImage)


module.exports = router