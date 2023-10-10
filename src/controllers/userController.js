const functions = require("../functions/functions");
const userssFunctions = require("../functions/usersFunctions")

const userController = {

    index: function(req,res){
        res.render("allusers",{
            title: "Todos los usuarios" + functions.title,
            users: userssFunctions.allUsers(),
            label: "Todos los usuarios",
        })
    },

    login: function(req,res){
        res.render("login",{
            title: "Login" + " - Mercado Liebre",
        })
    },
    register: function(req, res){
        res.render("register",{
            title: "Registrate" + " - Mercado Liebre",
        })
    }
}
module.exports = userController