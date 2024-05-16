//Middleware de configuración de express-validator para encontrar email en la DB
const { body } = require('express-validator');
const usersFunctions = require("../../../functions/usersFunctions")

const usertValidations = [
    body('email')
        .notEmpty().withMessage('Debes completar el E-Mail ').bail()
        .isEmail().withMessage("Debes ingresar un E-Mail valido").bail()
        .isLength({min:8, max:40}).withMessage("El E-Mail debe tener entre 8 y 40 caracteres")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKey(value, "email" )[0];
            if (!user){
                throw new Error(`E-mail no válido`);
            }
            return true
        }),
    ]
module.exports = usertValidations