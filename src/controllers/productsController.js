const productsFunctions = require("../functions/productsFunctions")
const functions = require("../functions/functions")
const path = require('path');
const fs = require('fs');

const productsController ={

    index: function(req,res){
        res.render("allProducts",{
            title: "Todos los productos" + functions.title,
            products: productsFunctions.allProducts()
        })
    },

    detail: function(req,res){
        let product = productsFunctions.filterByKey(req.params.id,"id")[0];
        if(product){
            let discountedPrice = (product.price - ((product.price)*(product.discount/100)) )
            product.finalPrice = Math.round(discountedPrice)
        }
        
        res.render("productDetail",{
            title: product.name,
            product: product,
            toThousand: functions.toThousand
        })
    },

    create: function(req,res){
        res.render("productCreateForm",{
            title: "Crear Producto" + functions.title,
            status: functions.allStatus(),
            categories: functions.allCategories()
        })
    },

    store: function(req,res){
        let id = productsFunctions.newProduct(req.body)
        let newProduct = productsFunctions.allProducts().pop()
		res.redirect("/products/" + id)
    }

}
module.exports = productsController
