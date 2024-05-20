//Middleware de configuración de express-validator para rutas de productos
const path = require('path');
const { body } = require('express-validator');

const productValidations = [
    body('img').custom((value, {req})=> {
        let file = req.file;
        let acceptedExt = [".bpm", ".png", ".jpg", ".gif"]
        if(!file){
            throw new Error("Debes incluir una imagen para el producto");
        } else {
            let ext = path.extname(file.originalname)
            if(!acceptedExt.includes(ext)){
                throw new Error("El formato del archivo es incompatible");
            }
        }
        return true
    }) 
]
module.exports = productValidations