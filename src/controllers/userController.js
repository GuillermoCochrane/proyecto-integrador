const functions = require("../functions/functions");
const usersFunctions = require("../functions/usersFunctions")

const userController = {

    index: function(req,res){
        res.render("allusers",{
            title: "Todos los usuarios" + functions.title,
            users: usersFunctions.allUsers(),
            label: "Todos los usuarios",
        })
    },

    login: function(req,res){
        res.render("login",{
            title: "Login" + " - Mercado Liebre",
        })
    },

    detail: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        if (!user){
            return res.redirect("/products/notFound")
        } else {
            return res.render("userDetail",{
                title: user.name,
                user: user,
            })
        }
    },

    register: function(req, res){
        res.render("register",{
            title: "Registrate" + " - Mercado Liebre",
        })
    },


}
module.exports = userController