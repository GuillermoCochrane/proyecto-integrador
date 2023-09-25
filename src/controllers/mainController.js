const path = require('path');

const mainController ={
    index: function(req,res){
        return res.sendFile(path.join(__dirname,"../views/home.html"))
    },
    redirect: function(req,res){
        res.redirect('/');
    }

}
module.exports = mainController
