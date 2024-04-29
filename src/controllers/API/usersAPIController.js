const usersFunctions = require("../../functions/usersFunctions");
const usersAPIController = {

    emailCheck: function(req,res){
        let data = usersFunctions.filterByKey(req.params.email, "email")[0];
        let response = true;
        data ? response = true : response = false;
        let info = {
            meta: {
                status : 200,
                url: 'api/users/email/:email'
            },
            inUse: response,
        }
        return res.json(info)
    },

    usernameCheck: function(req,res){
        let data = usersFunctions.filterByKey(req.params.username, "username")[0];
        let response = true;
        data ? response = true : response = false;
        let info = {
            meta: {
                status : 200,
                url: 'api/users/username/:username'
            },
            inUse: response,
        }
        return res.json(info)
    },

    phoneCheck: function(req,res){
        let data = usersFunctions.filterByKey(req.params.phone, "phone")[0];
        let response = true;
        data ? response = true : response = false;
        let info = {
            meta: {
                status : 200,
                url: 'api/users/phone/:phone'
            },
            inUse: response,
        }
        return res.json(info)
    },

    userlogged: function(req, res){
        let info = {
            meta: {
                status : 200,
                url: 'api/users/userlogged',
                logged: true
            },
        }
        if (req.session.userlogged){
            info.data = req.session.userlogged;
            return res.json(info);
        } else {
            info.meta.logged = false;
            info.data = "El usuario no se encuentra logeado"
            return res.json(info);
        }
    },
}

module.exports = usersAPIController
