const path = require('path');
const { body } = require('express-validator');

const productValidations = [
    body('name')
        .notEmpty().withMessage('Debes completar el nombre del producto').bail()
        .isLength({min:3, max:50}).withMessage("El nombre del producto debe tener entre 3 y 50 caracteres"),
    body('category').notEmpty().withMessage('Debes seleccionar una categoría para el producto'),
    body('status').notEmpty().withMessage('Debes seleccionar un estado para el producto'),
    body('price')
        .notEmpty().withMessage('Debes completar el precio del producto').bail()
        .isNumeric().withMessage('El dato ingresado debe ser un número'),
    body('discount')
        .notEmpty().withMessage('Debes completar el descuento del producto').bail()
        .isNumeric().withMessage('El dato ingresado debe ser un número'),
    body('description')
        .notEmpty().withMessage('Debes completar la descripción del producto').bail()
        .notEmpty().withMessage('Debes completar el nombre del producto').bail()
        .isLength({min:3, max:250}).withMessage("El nombre del producto debe tener entre 3 y 250 caracteres"),
    body('img').custom((value, {req})=> {
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
module.exports = productValidations