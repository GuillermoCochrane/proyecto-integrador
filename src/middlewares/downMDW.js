//Middleware de ruta que redireciona la ruta a home, cuando se setea la barriable en true
function downMDW (req,res, next) {
    let downRoute = true;
    if(downRoute){
        return res.redirect("/")
    }
    next();
}

module.exports = downMDW

