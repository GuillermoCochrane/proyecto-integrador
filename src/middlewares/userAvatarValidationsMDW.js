//Middleware de configuración de express-validator para rutas de usuarios, para imagen de perfil
const path = require('path');
const { body } = require('express-validator');

const usertValidations = [
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExt = [".bpm", ".png", ".jpg", ".gif"]
        if(!file){
            throw new Error("Debes incluir una imagen de perfil");
        } else {
            let ext = path.extname(file.originalname)
            if(!acceptedExt.includes(ext)){
                throw new Error("El formato del archivo es incompatible");
            }
        }
        return true
    }) 
]
module.exports = usertValidations