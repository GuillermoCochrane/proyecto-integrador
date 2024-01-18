//Middleware de configuración de express-validator para rutas de usuarios
const { body } = require('express-validator');
const usersFunctions = require("../functions/usersFunctions")

const usertValidations = [
    body('name')
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({min:3, max:30}).withMessage("El nombre debe tener entre 3 y 30 caracteres"),
    body('phone')
        .notEmpty().withMessage('Debes completar el número de teléfono').bail()
        .isNumeric().withMessage('El dato ingresado debe ser un número').bail()
        .isLength({min:10, max:10}).withMessage("El Número de teléfono debe tener 10 numeros")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKeyExact(value, "phone" )[0];
            let userlogged = req.session.userlogged;
            if (user){
                if(userlogged && (user.id == userlogged.id)){
                    return true
                }
                throw new Error(`${user.phone} se encuentra en uso`);
            }
            return true
        }),
    body('address')
        .notEmpty().withMessage('Debes completar con tu dirección ').bail()
        .isLength({min:3, max:30}).withMessage("La dirección debe tener entre 3 y 30 caracteres"),
]
module.exports = usertValidations