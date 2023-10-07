const tools = require("../functions/productsFunctions")

const productsController ={

    index: function(req,res){
        res.render("allProducts",{
            title: "Todos los productos" + tools.title,
            products: tools.allProducts()
        })
    },

}
module.exports = productsController
