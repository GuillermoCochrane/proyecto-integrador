const title =["Login","Registrate"]
const path = require('path');
const userController = {
    login: function(req,res){
        res.render("login",{
            title: title[0],
        })
    },
    register: function(req, res){
        res.render("register",{
            title: title[1],
        })
    }
}
module.exports = userController