//Middleware de configuración de express-validator para rutas de usuarios
const { body } = require('express-validator');
const usersFunctions = require("../../../functions/usersFunctions")

const usertValidations = [
    body('username')
        .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
        .isLength({min:3, max:30}).withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKey(value, "username" )[0];
            let userlogged = req.session.userlogged;
            if (user){
                if(userlogged && (user.id == userlogged.id)){
                    return true
                }
                throw new Error(`El nombre de usuario ${user.username} se encuentra en uso`);
            }
            return true
        }),
    body('email')
        .notEmpty().withMessage('Debes completar el E-Mail ').bail()
        .isEmail().withMessage("Debes ingresar un E-Mail valido").bail()
        .isLength({min:8, max:40}).withMessage("El E-Mail debe tener entre 8 y 40 caracteres")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKey(value, "email" )[0];
            let userlogged = req.session.userlogged;
            if (user){
                if(userlogged && (user.id == userlogged.id)){
                    return true
                }
                throw new Error(`${user.email} se encuentra en uso`);
            }
            return true
        }),
    ]
module.exports = usertValidations