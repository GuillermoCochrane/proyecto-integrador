//Middleware de configuración de express-validator para el formulario de login
const { body } = require('express-validator');
const usersFunctions = require("../functions/usersFunctions")

const loginValidationsMDW = [
    body('username')
        .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKey(value, "username" )[0]
            if (!user){
                throw new Error(`El nombre de usuario es incorrecto`);
            }
            return true
        }),
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .custom((value, {req}) => {
        let user = usersFunctions.filterByKey(req.body.username, "username" )[0]
        if(user.password != value){
            throw new Error("Contraseña incorrecta");
        }
        return true
    }),
]
module.exports = loginValidationsMDW