const tools = require("../functions/productsFunctions")

const mainController ={
    index: function(req,res){
        let inSale = tools.filterByKey("in-sale","status");
        let visited = tools.filterByKey("visited","status")
        res.render("home",{
            inSale: inSale,
            visited: visited,
            title: "Bienvenido" + tools.title
        })
    },

    redirect: function(req,res){
        res.redirect('/');
    },

}
module.exports = mainController
