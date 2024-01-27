const functions = require("../functions/functions");
const usersFunctions = require("../functions/usersFunctions")
const salesFunctions = require("../functions/salesFunctions")
const mailFunction = require("../functions/mailFunction");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
        if (errors.isEmpty()){
            let user = usersFunctions.filterByKey(req.body.username, "username" )[0]
            delete user.password;
            req.session.userlogged = user;
            if(req.body.rememberMe){
                res.cookie("userID", user.id, {maxAge: (1000*60)*30} ) //1000*60 = 1000ms * 60s == 1 min
            }
            return res.redirect("/")
        } else {
            let error = errors.mapped();
            return res.render('login',{
                title: "Login" + functions.title,
                error: error,
                old: req.body.username
            })
        }
    },

    profile: function(req,res){
        let user = req.session.userlogged;
        let purchases = salesFunctions.purchasesCounter(user.id);
        let data = usersFunctions.userProfileData(user, purchases)
        return res.render("userProfile", data)
    },

    logout: function(req,res){
        res.clearCookie("userID")
        req.session.destroy();
        res.redirect('/')
    },

    test: function(req,res){
        res.send(req.session.userlogged)
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
            let id = usersFunctions.newUser(req.body);
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

    changeAvatar:  function(req,res){
        let errors = validationResult(req);
        let file = req.file;
        let user = req.session.userlogged;
        let purchases = salesFunctions.purchasesCounter(user.id);
        let data = usersFunctions.userProfileData(user, purchases);
        if (errors.isEmpty()){
            usersFunctions.changeAvatar(user.id, file);
            return res.redirect("/users/profile")
        } else {
            data.errors = errors.mapped();
            return res.render("userProfile", data)
        }
    },

    changePassword: function(req,res){
        let errors = validationResult(req);
        let info = req.body;
        let user = req.session.userlogged;
        let purchases = salesFunctions.purchasesCounter(user.id);
        let data = usersFunctions.userProfileData(user, purchases);
        if (errors.isEmpty()){
            usersFunctions.changePassword(user.id, info);
            return res.redirect("/users/profile")
        } else { 
            data.errors = errors.mapped();
            return res.render("userProfile", data)
        }
    },

    updateData: function(req,res){
        let errors = validationResult(req);
        let info = req.body;
        let user = req.session.userlogged;
        let purchases = salesFunctions.purchasesCounter(user.id);
        let data = usersFunctions.userProfileData(user, purchases);
        if (errors.isEmpty()){
            usersFunctions.editUserData(user.id, info);
            return res.redirect("/users/profile")
        } else { 
            data.errors = errors.mapped();
            data.errors.form = true;
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
        let { email } = req.body;
        if (!req.body.token){
            let recoveryToken = bcrypt.hashSync(email, 10);
            let recoveryURL = `${url}/${recoveryToken}`;
            let mailData = mailFunction.mailRecovery(email,recoveryToken,recoveryURL);
            mailFunction.send(mailData.to, mailData.subject, mailData.text);
            return res.render('recovery',{
                title: "Recuperar Contraseña - " + functions.title,
                tokenInput: true,
                old: email
            });
        } else {
            if(bcrypt.compareSync(email,req.body.token)){
                return res.render("newPassword",{
                    title: "Nueva Contraseña - " + functions.title,
                    old: email,
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

    replacePassword: function(req,res){
        let errors = validationResult(req);
        let {email} = req.body;
        let user = usersFunctions.filterByKey(email, "email")[0];
        if (errors.isEmpty()){
            usersFunctions.changePassword(user.id, req.body);
            return res.redirect("/users/login")
        } else {
            return res.render("newPassword",{
                title: "Nueva Contraseña - " + functions.title,
                old: email,
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