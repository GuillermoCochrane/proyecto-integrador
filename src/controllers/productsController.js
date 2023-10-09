const productsFunctions = require("../functions/productsFunctions")
const functions = require("../functions/functions")

const productsController ={

    index: function(req,res){
        res.render("allProducts",{
            title: "Todos los productos" + functions.title,
            products: productsFunctions.allProducts(),
            label: "Todos los productos"
        })
    },
    
    category: function(req,res){
        let products = productsFunctions.filterByKey(req.params.idCat,"category");
        let categories = functions.allCategories()
        let category = categories.filter(cat => cat.id == req.params.idCat)[0]
        res.render("allProducts",{
            products: products,
            title:  "Productos: " + category.category + functions.title,
            label: "Productos: " + category.category
        })
    },

    status: function(req,res){
        let products = productsFunctions.filterByKey(req.params.idStatus,"status");
        let status = functions.allStatus()
        let selectedStatus = status.filter(s => s.id == req.params.idStatus)[0]
        res.render("allProducts",{
            products: products,
            title:  "Productos: " + selectedStatus.status + functions.title,
            label: "Productos: " + selectedStatus.status
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
        let id = productsFunctions.editProduct(req.params.id, req.body)
		res.redirect("/products/" + id)
    }

}
module.exports = productsController
