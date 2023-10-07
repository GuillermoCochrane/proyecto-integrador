const tools = require("../functions/productsFunctions")

const productsController ={

    index: function(req,res){
        res.render("allProducts",{
            title: "Todos los productos" + tools.title,
            products: tools.allProducts()
        })
    },

    detail: function(req,res){
        let product = tools.filterByKey(req.params.id,"id");
        product = product[0];
        let discountedPrice = (product.price - ((product.price)*(product.discount/100)) )
		product.finalPrice = Math.round(discountedPrice)
        res.render("productDetail",{
            title: product.name,
            product: product,
            toThousand: tools.toThousand
        })
    }

}
module.exports = productsController
