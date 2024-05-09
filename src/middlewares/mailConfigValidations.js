//Middleware de configuración de express-validator para Email del sitio
const { body } = require('express-validator');

const userValidations = [
    body('email')
        .notEmpty().withMessage('Debes completar el E-Mail').bail()
        .isEmail().withMessage("Debes ingresar un E-Mail válido").bail()
        .isLength({min:8, max:40}).withMessage("El E-Mail debe tener entre 8 y 40 caracteres"),
    body("pass")
    .notEmpty().withMessage('Debes completar la clave').bail()
    .isLength({min:19, max:19}).withMessage("La clave debe tener 19 caracteres")
    ];

module.exports = userValidations