//Middleware para llevar cuentas de las visitas a cada uno de los productos
const productFunctions = require("../functions/productsFunctions");
let productViewsCounterMDW = (req, res, next) =>{
    productFunctions.productViews(req);
    next();
}

module.exports = productViewsCounterMDW