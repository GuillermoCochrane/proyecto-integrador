//Middleware de configuración de express-validator para categorías
const { body } = require('express-validator');

const usertValidations = [
    body('status')
        .notEmpty().withMessage('Debes completar con una Estado').bail()
        .isLength({min:3, max:30}).withMessage("El estado debe tener entre 3 y 30 caracteres"),
]
module.exports = usertValidations