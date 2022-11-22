const   multer = require('multer'),
        path = require('path'),
        { v4:uuidv4 } = require('uuid'),
        storage = multer.diskStorage({
            destination: path.join(__dirname, '../storage'),
            filename: (req, file, cb)=>{
                cb(null, uuidv4() + '.' + file.mimetype.split('/')[1])
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

module.exports = { minetypes, upload  }