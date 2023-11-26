//Middleware de ruta que redireciona al login , cuando un usuario no está logeado
function loggedMDW (req,res, next) {
    if(!req.session.userlogged){
        return res.redirect("/users/login")
    }
    next();
}

module.exports = loggedMDW

