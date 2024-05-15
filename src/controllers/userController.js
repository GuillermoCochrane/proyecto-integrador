const functions = require("../functions/functions");
const usersFunctions = require("../functions/usersFunctions");
const mailFunction = require("../functions/mailFunction");
const { validationResult } = require('express-validator');

const userController = {

    index: function(req,res){
        let data = usersFunctions.data("Todos los usuarios");
        data.users = usersFunctions.allUsers();
        return res.render("users/allUsers",data)
    },

    login: function(req,res){
        let data = usersFunctions.data("Login");
        data.pageScript = ["users/viewPassword", "users/validator.min", "users/loginValidations"];
        return res.render("users/login",data)
    },

    processLogin: function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let user = usersFunctions.filterByKey(req.body.username, "username" )[0]
            delete user.password;
            req.session.userlogged = user;
            if(req.body.rememberMe){
                res.cookie("userID", user.id, {maxAge: (1000*60)*60} ) //(1000*60 = 1000ms * 60s = 1 min) * 60min = 1h
            }
            return res.redirect("/")
        } else {
            let data = usersFunctions.data("Login");
            data.error = errors.mapped();
            data.old = req.body.username;
            data.pageScript = ["users/viewPassword", "users/validator.min", "users/loginValidations"];
            return res.render('users/login', data)
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
        return res.render("products/allProducts",data)
    },

    detail: function(req,res){
        let user = usersFunctions.detailData(req.params.id);
        if (!user){
            return res.redirect("/users/notFound")
        } else {
            return res.render("users/userDetail",user)
        }
    },

    register: function(req, res){
        let data = functions.userFormData("Registrate", [] );
        data.pageScript = ["users/validator.min", "users/registerValidations" ,"users/viewPassword"];
        res.render("users/userRegister", data)
    },

    store:  function(req, res){
        let errors = validationResult(req);
        let old = functions.userFormData("Registrate", req.body);

        if (errors.isEmpty()){
            let id = usersFunctions.newUser(req.body);
            return res.redirect("/users/" + id)
        } else {
            old.errors = errors.mapped();
            old.pageScript = ["users/validator.min", "users/registerValidations" ,"users/viewPassword"];
            return res.render('users/userRegister',old)
        }
    },

    edit: function(req,res){
        let user = usersFunctions.filterByID(req.params.id)[0];
        let data = functions.userFormData(("Editando usuario: " + user.username), user)

        if (!user){
            return res.redirect("/users/notFound")
        }else{
            return res.render("users/userEdit", data)
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
            return res.render('users/userEdit',old)
        }
    },

    profile: function(req,res){
        let data = usersFunctions.userProfileData(req.session.userlogged);
        data.userData = true;
        data.pageScript = ["users/profile","users/viewPassword", "users/validator.min", "users/passwordValidations","users/editUserValidations","users/avatarValidations"];
        return res.render("users/userProfile", data)
    },

    changeAvatar:  function(req,res){
        let errors = validationResult(req);
        let file = req.file;
        let data = usersFunctions.userProfileData(req.session.userlogged);
        data.pageScript = ["users/profile","users/viewPassword", "users/validator.min", "users/passwordValidations","users/editUserValidations","users/avatarValidations"];
        if (errors.isEmpty()){
            usersFunctions.changeAvatar(data.user.id, file);
            return res.redirect("/users/profile")
        } else {
            data.errors = errors.mapped();
            return res.render("users/userProfile", data)
        }
    },

    changePassword: function(req,res){
        let errors = validationResult(req);
        let info = req.body;
        let data = usersFunctions.userProfileData(req.session.userlogged);
        data.pageScript = ["users/profile","users/viewPassword", "users/validator.min", "users/passwordValidations","users/editUserValidations","users/avatarValidations"];
        if (errors.isEmpty()){
            usersFunctions.changePassword(data.user.id, info);
            return res.redirect("/users/profile")
        } else { 
            data.errors = errors.mapped();
            return res.render("users/userProfile", data)
        }
    },

    updateData: function(req,res){
        let errors = validationResult(req);
        let info = req.body;
        let data = usersFunctions.userProfileData(req.session.userlogged);
        data.pageScript = ["users/profile","users/viewPassword", "users/validator.min", "users/passwordValidations","users/editUserValidations","users/avatarValidations"];
        if (errors.isEmpty()){
            usersFunctions.editUserData(data.user.id, info);
            return res.redirect("/users/profile")
        } else { 
            data.errors = errors.mapped();
            data.errors.form = true;
            data.old = info;
            return res.render("users/userProfile", data)
        }
    },

    recover: function(req,res){
        let data = {
            title:      "Recuperar Contraseña " + functions.title,
            tokenInput: false,
            pageScript: ["users/validator.min", "users/recoverValidations"],
        };
        return res.render("users/recovery",data);
    },

    processRecovery:  function(req,res){
        let url =   req.protocol + '://' + req.get('host') + req.originalUrl;
        let errors = validationResult(req);
        let { email } = req.body;
        let data = {
            title:      "Recuperar Contraseña - " + functions.title,
            tokenInput: false,
            pageScript: ["users/validator.min", "users/recoverValidations"],
        };

        if (!errors.isEmpty()){
            data.error = errors.mapped();

            return res.render('users/recovery',data);
        }
        if (!req.body.token){
            let userToken = mailFunction.mailRecovery(email,url);
            usersFunctions.changeToken(email,userToken);
            data.tokenInput = true;
            data.old = email
            return res.render('users/recovery',data);
        } else {
            let user = usersFunctions.filterByKey(email, "email")[0];

            if(user.token == req.body.token){
                req.session.recovery = email;

                return res.render("users/newPassword",{
                    title: "Nueva Contraseña - " + functions.title,
                })
            } else {
                data.tokenInput = true;
                data.old = email;
                data.error = {
                    token:{
                        msg: "Token Inválido"
                    }
                };

                return res.render('users/recovery', data)
            }
        }
    },

    recoverLink: function(req,res){
        let {token} = req.params;
        let user = usersFunctions.filterByKeyExact(token,"token")[0];

        if(user){
            req.session.recovery = user.email;
            return res.render("users/newPassword",{
                title: "Nueva Contraseña - " + functions.title,
            })
        } else {
            return res.render('users/recovery',{
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
            return res.render("users/newPassword",{
                title: "Nueva Contraseña - " + functions.title,
                errors: errors.mapped(),
            })
        }
    },
    
    saleDetail: function(req,res){
        let data = usersFunctions.saleDetail(req.params.id);
        return res.render("cart/cart", data)
    },

    delete: function(req,res){
        let data = usersFunctions.deleteData(req.params.id)

        if(!data){
            return res.redirect("/users/notFound");
        }else{
            return res.render("confirmDelete",data);
        };
    },

    destroy: function(req,res){
        usersFunctions.deleteUser(req.params.id);
		res.redirect("/");
    }

}
module.exports = userController