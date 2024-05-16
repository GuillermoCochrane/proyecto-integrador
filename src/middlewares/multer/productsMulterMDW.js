//Middleware de configuración de multer para rutas de productos
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../../public/images/products"))
    },
    filename: function(req,file, cb){
        let newFileName = "product" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const upload = multer({storage})

module.exports = upload