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
            title: "Login" + functions.title,
        })
    },

    processLogin: function(req,res){
        let users = usersFunctions.allUsers();
        let password = req.body.password;
        let user = users.filter( user => user.username.toUpperCase() == req.body.username.toUpperCase())[0]
        if (user){
            if (user.password == req.body.password){
                return res.redirect("/users/" + user.id)
            }
            let error = "Contraseña Incorrecta";
            return res.render("login",{
                title: error + functions.title,
                error: error,
                old: user.username,
            })
        }
        let error = "Usuario Incorrecto";
            return res.render("login",{
                title: error + functions.title,
                error: error
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
        let file = req.file;
        let profiles = usersFunctions.profiles()
        profiles.pop()
        let old = functions.userFormData("Registrate", req.body, profiles) 
        if (file){
            if(functions.extValidator(file)){
                old.error = "El formato del archivo es incompatible";
                return res.render('userRegister',old)
            }
            if(req.body.password != req.body.confirm){
                old.passwordError = "Las contraseñas no coinciden";
                return  res.render("userRegister", old)
            }
            let id = usersFunctions.newUser(req.body,file);
            return res.redirect("/users/"+id)
        }
        old.error = "Hubo un problema en la carga de la imagen";
        return res.render(res.render('userRegister',old))
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
        if(req.body.password != req.body.confirm){
            let profiles = usersFunctions.profiles()
            profiles.pop()
            return  res.render("userRegister",{
                title: "Registrate" + functions.title,
                categories: functions.allCategories(),
                profiles: profiles,
                passwordError: "Las contraseñas no coinciden",
                user: req.body
            })
        }
        let id = usersFunctions.editUser(req.params.id, req.body);
        res.redirect("/users/"+id)
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