const path = require('path');

const mainController ={
    index: function(req,res){
        res.render('home')
    },
    redirect: function(req,res){
        res.redirect('/');
    }

}
module.exports = mainController
