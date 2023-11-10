const productFunctions = require("../functions/productsFunctions");
let productViewsCounterMDW = (req, res, next) =>{
    productFunctions.productViews(req);
    next();
}

module.exports = productViewsCounterMDW