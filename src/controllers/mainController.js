const tools = require("../functions/functions")
const productsFunctions =require("../functions/productsFunctions")

const mainController ={
    index: function(req,res){
        let inSale = productsFunctions.filterByKey(2,"status");
        let visited = productsFunctions.filterByKey(3,"status")
        res.render("home",{
            inSale: inSale,
            visited: visited,
            title: "Bienvenido" + tools.title,
            toThousand: tools.toThousand,
        })
    },

    search: function(req,res){
        let searchResults = productsFunctions.search(req.query.search)
        res.render("allProducts",{
            title: searchResults.label + tools.title,
            label: searchResults.label,
            products: searchResults.results,
            toThousand: tools.toThousand,
        })
    },

    redirect: function(req,res){
        res.redirect('/');
    },

}
module.exports = mainController
