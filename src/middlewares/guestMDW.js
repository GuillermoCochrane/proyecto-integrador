//Middleware de ruta que redireciona al perfil del usuario, cuando un usuario está logeado
function guestMDW (req,res, next) {
    if(req.session.userlogged){
        return res.redirect("/users/profile")
    }
    next();
}

module.exports = guestMDW

