//Middleware de ruta que redireciona al usuario que no es administardor
const usersFunctions = require("../functions/usersFunctions");
function adminMDW (req,res, next) {
    if((!(req.session.userlogged) || req.session.userlogged.profile != 3) ){
        return res.redirect("/")
        }
    next();
}

module.exports = adminMDW

