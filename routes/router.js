const express = require('express'),
        router = express.Router()
        ImageController  =require('../controllers/ImageController')

    router.get('/', (req,res)=>{
        res.render( 'image')
    })
        .post('/upload', ImageController.upload.single('image'), ImageController.uploadImage)


module.exports = router