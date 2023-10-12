const functions = require("../functions/functions");
const usersFunctions = require("../functions/usersFunctions")

const userController = {

    index: function(req,res){
        res.render("allUsers",{
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

    userNotFound: function(req,res){
        return res.render("allProducts",{
            products: [],
            title:  "Usuario no encontrado" + functions.title,
            label: "Usuario no encontrado", 
        })
    },

    detail: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        if (!user){
            return res.redirect("/users/notFound")
        } else {
            return res.render("userDetail",{
                title: user.name,
                user: user,
                profiles: usersFunctions.profiles(),
                categories: functions.allCategories()
            })
        }
    },

    register: function(req, res){
        let profiles = usersFunctions.profiles()
        profiles.pop()
        res.render("userRegister",{
            title: "Registrate" + functions.title,
            categories: functions.allCategories(),
            profiles: profiles
        })
    },

    store:  function(req, res){
        let id = usersFunctions.newUser(req.body)
        res.redirect("/users/"+id)
    },

    edit: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        if (!user){
            return res.redirect("/users/notFound")
        }else{
            let profiles = usersFunctions.profiles()
            profiles.pop()
            return res.render("userEdit",{
                title: "Editando usuario:" + user.username + functions.title,
                categories: functions.allCategories(),
                profiles: profiles,
                user: user
            })
        }
    },

    update: function(req, res){
        let id = usersFunctions.editUser(req.params.id, req.body);
        res.redirect("/users/"+id)
    },

}
module.exports = userController