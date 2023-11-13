const path = require('path');
const { body } = require('express-validator');
const usersFunctions = require("../functions/usersFunctions")

const usertValidations = [
    body('name')
        .notEmpty().withMessage('Debes completar con tu nombre').bail()
        .isLength({min:3, max:30}).withMessage("El nombre debe tener entre 3 y 30 caracteres"),
    body('username')
        .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
        .isLength({min:3, max:30}).withMessage("El nombre de usuario debe tener entre 3 y 30 caracteres")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKey(value, "username" )[0]
            if (user){
                if(user.id == req.params.id){
                    return true
                }
                throw new Error(`El nombre de usuario ${user.username} se encuentra en uso`);
            }
            return true
        }),
    body('email')
        .notEmpty().withMessage('Debes completar el E-Mail ').bail()
        .isEmail().withMessage("Debes ingresar un E-Mail valido").bail()
        .isLength({min:8, max:20}).withMessage("El E-Mail debe tener entre 8 y 20 caracteres")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKey(value, "email" )[0]
            if (user){
                if(user.id == req.params.id){
                    return true
                }
                throw new Error(`${user.email} se encuentra en uso`);
            }
            return true
        }),
    body('phone')
        .notEmpty().withMessage('Debes completar el número de teléfono').bail()
        .isNumeric().withMessage('El dato ingresado debe ser un número').bail()
        .isLength({min:10, max:10}).withMessage("El Número de teléfono debe tener 10 numeros")
        .custom((value, {req}) =>{
            let user = usersFunctions.filterByKeyExact(value, "phone" )[0]
            if (user){
                if(user.id == req.params.id){
                    return true
                }
                throw new Error(`${user.phone} se encuentra en uso`);
            }
            return true
        }),
    body('address')
        .notEmpty().withMessage('Debes completar con tu dirección ').bail()
        .isLength({min:3, max:30}).withMessage("La dirección debe tener entre 3 y 30 caracteres"),
    body('borndate').notEmpty().withMessage('Debes completar con tu Fecha de nacimiento'), // validar que se fecha
    body('profile').notEmpty().withMessage('Debes seleccionar un perfil de usuario'),
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min:8, max:16}).withMessage("La contraseña debe tener entre 8 y 16 caracteres").bail()
        .custom((value, {req}) => {
        if(value != req.body.confirm){
            throw new Error("Las contraseñas no coinciden");
        }
        return true
    }),//validar password
    body('photo').custom((value, {req}) => {
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
module.exports = usertValidations