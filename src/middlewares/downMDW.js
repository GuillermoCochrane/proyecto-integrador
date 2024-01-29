//Middleware de ruta que redireciona al perfil del usuario, cuando un usuario está logeado
function downMDW (req,res, next) {
    let downRoute = true;
    if(downRoute){
        return res.redirect("/")
    }
    next();
}

module.exports = downMDW

