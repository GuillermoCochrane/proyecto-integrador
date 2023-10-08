const tools = require("../functions/functions")
const productsFunctions =require("../functions/productsFunctions")

const mainController ={
    index: function(req,res){
        let inSale = productsFunctions.filterByKey("in-sale","status");
        let visited = productsFunctions.filterByKey("visited","status")
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
