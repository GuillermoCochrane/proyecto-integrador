//Middleware global que setea configuraciones en la variable locals, dependiendo si el usuario esta logeado o no
let usersFunctions = require("../functions/usersFunctions")
let cartFunctions = require("../functions/cartFunctions")
function userLoggedMDW (req,res, next) {
    res.locals.isLogged = false;
    
    let idInCookie = req.cookies.userID;
    let userFromCookie = usersFunctions.filterByID(idInCookie)[0];

    if(userFromCookie){
        req.session.userlogged = userFromCookie;
    }

    if(req.session.userlogged){
        res.locals.isLogged = true;
        res.locals.userlogged = req.session.userlogged;
        let cartCount = cartFunctions.cartProductsCounter((req.session.userlogged.id));
        res.locals.cartCount = cartCount;
    }
    next();
}

module.exports = userLoggedMDW

