//Middleware de configuración de express-validator para rutas de usuarios, para  validar el password
const { body } = require('express-validator');
const usertValidations = [
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min:8, max:16}).withMessage("La contraseña debe tener entre 8 y 16 caracteres").bail()
        .isStrongPassword().withMessage("La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo").bail()
        .custom((value, {req}) => {
        if(value != req.body.confirm){
            throw new Error("Las contraseñas no coinciden");
        }
        return true
    }),
]
module.exports = usertValidations