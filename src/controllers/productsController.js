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
		res.redirect("/products/" + id)
    },

    edit: function(req,res){
        let product = productsFunctions.filterByKey(req.params.id,"id")[0];
        res.render("productEditForm",{
            title: "Editando - " + product.name,
            status: functions.allStatus(),
            categories: functions.allCategories(),
            product: product
        })
    },

    update: function(req,res){
        let products = productsFunctions.allProducts();
        for (const product of products) {
			if(product.id == req.params.id){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.status = req.body.status
                product.description = req.body.description
			}
		}
		let productJSON = JSON.stringify(products);
		fs.writeFileSync(productsFunctions.pathDB,productJSON);
		res.redirect("/products/"+req.params.id)
    }

}
module.exports = productsController
