const { dbConfig } = require('../database/db_con'),
        multer = require('multer'),
        path = require('path'),
        storage = multer.diskStorage({
            destination: path.join(__dirname, '../storage'),
            filename: (req, file, cb)=>{
                cb(null, 'IMG_'+Math.round(Math.random() * (Date.now()-100000 + 1) + 100000) + '_' + Date.now() + '.' + file.mimetype.split('/')[1])
            }
        }),
        minetypes = ['image/png','image/jpeg','image/jpg','image/webp','image/gif'],
        upload = multer(
            { 
                storage: storage,
                /* fileFilter: (req,file,cb)=>{
                    if(minetypes.includes(file.mimetype)) cb(null, true)
                    else cb(new Error( `Solo se aceptan archivos de tipo: ${minetypes.join(' ')}` ))
                }, */
                /* limits: {
                    fileSize: 5000000
                } */
            }
        )

module.exports = {
    upload: upload,

    async uploadImage(req,res){
        console.log(req.file)
        
        try {

            const errFileType = (!minetypes.includes(req.file.mimetype))  
                        ? (`Solo se aceptan archivos de tipo: ${minetypes.join(' ')}`) 
                        : false,
                    errFileSize = (req.file.size > 5000000) 
                                    ? (`Solo se aceptan imagenes de 5mb o menos, el tamaño de la imagen seleccionada es: ${req.file.size}`) 
                                    : false
            if(errFileType || errFileSize){
                if(errFileType) console.log(errFileType)
                if(errFileSize) console.log(errFileSize)
                res.redirect('/')
            }else{
                const newImage = await dbConfig.Image.create(
                    {
                        tipo: req.file.mimetype.split('/')[1],
                        nombre: req.file.filename
                    }
                )
                res.redirect('/')
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}