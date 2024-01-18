//Middleware de ruta que redireciona al perfil del usuario y muestra un error sin los datos personales no están completso
const salesFunctions = require("../functions/salesFunctions");
const usersFunctions = require("../functions/usersFunctions");
function userdataMDW (req,res, next) {
    if(!(req.session.userlogged && (req.session.userlogged.address && req.session.userlogged.phone && req.session.userlogged.name ))){
        let user = req.session.userlogged;
        let purchases = salesFunctions.purchasesCounter(user.id);
        let data = usersFunctions.userProfileData(user, purchases);
        data.errors = {
            name: {
                msg: "Debes completar tus datos personales antes de poder realizar una compra"
            },
            form: true,
        };
        return res.render("userProfile", data)
        }
    next();
}

module.exports = userdataMDW

