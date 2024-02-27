//Middleware de configuración de express-validator para categorías
const { body } = require('express-validator');

const usertValidations = [
    body('category')
        .notEmpty().withMessage('Debes completar con una categoría').bail()
        .isLength({min:3, max:30}).withMessage("La categoría debe tener entre 3 y 30 caracteres"),
]
module.exports = usertValidations