const { dbConfig } = require('../database/db_con'),
        { minetypes } = require('../helppers/multerConfig')

module.exports = {
    
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