//Middleware global que setea configuraciones en la variable locals, dependiendo si el usuario esta logeado o no
function userLoggedMDW (req,res, next) {
    res.locals.isLogged = false;
    if(req.session.userlogged){
        res.locals.isLogged = true;
    }
    next();
}

module.exports = userLoggedMDW

