const functions = require("../functions/functions");
const usersFunctions = require("../functions/usersFunctions")
const salesFunctions = require("../functions/salesFunctions")
const mailFunction = require("../functions/mailFunction");
const { validationResult } = require('express-validator');

const userController = {

    index: function(req,res){
        let data = usersFunctions.data("Todos los usuarios");
        data.users = usersFunctions.allUsers();
        return res.render("allUsers",data)
    },

    login: function(req,res){
        return res.render("login",usersFunctions.data("Login"))
    },

    processLogin: function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let user = usersFunctions.filterByKey(req.body.username, "username" )[0]
            delete user.password;
            req.session.userlogged = user;
            if(req.body.rememberMe){
                res.cookie("userID", user.id, {maxAge: (1000*60)*30} ) //1000*60 = 1000ms * 60s == 1 min
            }
            return res.redirect("/")
        } else {
            let data = usersFunctions.data("Login");
            data.error = errors.mapped();
            data.old = req.body.username
            return res.render('login', data)
        }
    },

    logout: function(req,res){
        res.clearCookie("userID")
        req.session.destroy();
        res.redirect('/')
    },

    test: function(req,res){
        let message = "No hay informacion en session"
        if(req.session.userlogged){
            message = req.session.userlogged;
        };
        if(req.session.recovery){
            message = req.session.recovery;
        };
        return res.send(message)
    },

    userNotFound: function(req,res){
        let data = usersFunctions.data("Usuario no encontrado");
        data.products = [];
        return res.render("allProducts",data)
    },

    detail: function(req,res){
        let user = usersFunctions.detailData(req.params.id);
        if (!user){
            return res.redirect("/users/notFound")
        } else {
            return res.render("userDetail",user)
        }
    },

    register: function(req, res){
        let data = functions.userFormData("Registrate", [] )
        res.render("userRegister", data)
    },

    store:  function(req, res){
        let errors = validationResult(req);
        let old = functions.userFormData("Registrate", req.body);

        if (errors.isEmpty()){
            let id = usersFunctions.newUser(req.body);
            return res.redirect("/users/" + id)
        } else {
            old.errors = errors.mapped();
            return res.render('userRegister',old)
        }
    },

    edit: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        let data = functions.userFormData(("Editando usuario: " + user.username), user)

        if (!user){
            return res.redirect("/users/notFound")
        }else{
            return res.render("userEdit", data)
        }
    },

    update: function(req, res){
        let errors = validationResult(req);
        let file = req.file;
        let data = req.body;
        data.id = req.params.id;

        let old = functions.userFormData("Registrate", data);
        if (errors.isEmpty()){
            let id = usersFunctions.editUser(data.id, data, file);
            return res.redirect("/users/"+id)
        } else {
            old.errors = errors.mapped();
            return res.render('userEdit',old)
        }
    },

    profile: function(req,res){
        let data = usersFunctions.userProfileData(req.session.userlogged)
        return res.render("userProfile", data)
    },


    changeAvatar:  function(req,res){
        let errors = validationResult(req);
        let file = req.file;
        let data = usersFunctions.userProfileData(req.session.userlogged);

        if (errors.isEmpty()){
            usersFunctions.changeAvatar(data.user.id, file);
            return res.redirect("/users/profile")
        } else {
            data.errors = errors.mapped();
            return res.render("userProfile", data)
        }
    },

    changePassword: function(req,res){
        let errors = validationResult(req);
        let info = req.body;
        let data = usersFunctions.userProfileData(req.session.userlogged);

        if (errors.isEmpty()){
            usersFunctions.changePassword(data.user.id, info);
            return res.redirect("/users/profile")
        } else { 
            data.errors = errors.mapped();
            return res.render("userProfile", data)
        }
    },

    updateData: function(req,res){
        let errors = validationResult(req);
        let info = req.body;
        let data = usersFunctions.userProfileData(req.session.userlogged);

        if (errors.isEmpty()){
            usersFunctions.editUserData(data.user.id, info);
            return res.redirect("/users/profile")
        } else { 
            data.errors = errors.mapped();
            data.errors.form = true;
            data.old = info;
            return res.render("userProfile", data)
        }
    },

    recover: function(req,res){
        return res.render("recovery",{
            title: "Recuperar Contraseña - " + functions.title,
            tokenInput: false
        })
    },

    processRecovery:  function(req,res){
        let url =   req.protocol + '://' + req.get('host') + req.originalUrl;
        let errors = validationResult(req);
        let { email } = req.body;

        if (!errors.isEmpty()){
            return res.render('recovery',{
                title: "Recuperar Contraseña - " + functions.title,
                tokenInput: false,
                error: errors.mapped(),
            });
        }
        if (!req.body.token){
            let userToken = mailFunction.mailRecovery(email,url);
            usersFunctions.changeToken(email,userToken);
            return res.render('recovery',{
                title: "Recuperar Contraseña - " + functions.title,
                tokenInput: true,
                old: email,
            });
        } else {
            let user = usersFunctions.filterByKey(email, "email")[0];

            if(user.token == req.body.token){
                req.session.recovery = email;
                return res.render("newPassword",{
                    title: "Nueva Contraseña - " + functions.title,
                })
            } else {
                return res.render('recovery',{
                    title: "Recuperar Contraseña - " + functions.title,
                    tokenInput: true,
                    old: email,
                    error: {
                        token:{
                            msg: "Token Inválido"
                        }
                    }
                })
            }
        }
    },

    recoverLink: function(req,res){
        let {token} = req.params;
        let user = usersFunctions.filterByKeyExact(token,"token")[0];

        if(user){
            req.session.recovery = user.email;
            return res.render("newPassword",{
                title: "Nueva Contraseña - " + functions.title,
            })
        } else {
            return res.render('recovery',{
                title: "Recuperar Contraseña - " + functions.title,
                tokenInput: true,
                error: {
                    token:{
                        msg: "Token Inválido"
                    }
                }
            })
        }
    },

    replacePassword: function(req,res){
        let errors = validationResult(req);
        let email = req.session.recovery;
        let user = usersFunctions.filterByKey(email, "email")[0];

        if (errors.isEmpty()){
            usersFunctions.changePassword(user.id, req.body);
            req.session.destroy();
            usersFunctions.changeToken(email, true );
            return res.redirect("/users/login")
        } else {
            return res.render("newPassword",{
                title: "Nueva Contraseña - " + functions.title,
                errors: errors.mapped(),
            })
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