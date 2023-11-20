const functions = require("../functions/functions");
const usersFunctions = require("../functions/usersFunctions")
const { validationResult } = require('express-validator')

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
            title: "Login" + functions.title,
        })
    },

    processLogin: function(req,res){
        let errors = validationResult(req);
        let user = usersFunctions.filterByKey(req.body.username, "username" )[0]
        if (errors.isEmpty()){
            return res.redirect("/users/" + user.id)
        } else {
            let error = errors.mapped();
            return res.render('login',{
                title: "Login" + functions.title,
                error: error,
                old: req.body.username
            })
        }
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
        let profiles = usersFunctions.profiles();
        profiles.pop();
        let data = functions.userFormData("Registrate", [] , profiles)
        res.render("userRegister", data)
    },

    store:  function(req, res){
        let errors = validationResult(req);
        let file = req.file;
        let profiles = usersFunctions.profiles();
        profiles.pop();
        let old = functions.userFormData("Registrate", req.body, profiles);
        if (errors.isEmpty()){
            let id = usersFunctions.newUser(req.body,file);
            return res.redirect("/users/" + id)
        } else {
            old.errors = errors.mapped();
            return res.render('userRegister',old)
        }
    },

    edit: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        let profiles = usersFunctions.profiles();
        profiles.pop();
        let data = functions.userFormData(("Editando usuario: " + user.username), user , profiles)
        if (!user){
            return res.redirect("/users/notFound")
        }else{
            return res.render("userEdit", data)
        }
    },

    update: function(req, res){
        let errors = validationResult(req);
        let file = req.file;
        let profiles = usersFunctions.profiles();
        profiles.pop();
        let data = req.body;
        data.id = req.params.id;
        let old = functions.userFormData("Registrate", data, profiles);
        if (errors.isEmpty()){
            let id = usersFunctions.editUser(data.id, data, file);
            return res.redirect("/users/"+id)
        } else {
            old.errors = errors.mapped();
            return res.render('userEdit',old)
        }
    },

    delete: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        if(!user){
            return res.redirect("/users/notFound");
        }else{
            let product = {
                id: user.id,
                name: user.username,
            };
            return res.render("confirmDelete",{
                products: product,
                title: "Eliminando - " + product.name,
                label: "Usuario",
                path: "users"
            });
        };
    },

    destroy: function(req,res){
        usersFunctions.deleteUser(req.params.id);
		res.redirect("/");
    }

}
module.exports = userController