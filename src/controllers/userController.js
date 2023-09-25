const path = require('path');
const userController = {
    login: function(req,res){
        res.sendFile(path.join(__dirname,"../views/login.html"))
    },
    register: function(req, res){
        res.sendFile(path.join(__dirname,"../views/register.html"))
    }

}
module.exports = userController