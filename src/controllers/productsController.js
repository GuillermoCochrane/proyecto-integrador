const productsFunctions = require("../functions/productsFunctions");
const functions = require("../functions/functions");
const { validationResult } = require('express-validator')

const productsController ={

    index: function(req,res){
        let title = "Todos los productos";
        let products = productsFunctions.allProducts();
        res.render("products/allProducts", functions.productData(title, products, title));
    },
    
    category: function(req,res){
        let data = productsFunctions.productsByCategory(req.params.idCat);
        let title = "Productos: " + data.category
        res.render("products/allProducts", functions.productData(title, data.products, title));
    },

    status: function(req,res){
        let data = productsFunctions.productsByStatus(req.params.idStatus);
        let title = "Productos: " + data.status;
        res.render("products/allProducts",functions.productData(title, data.products, title));
    },

    detail: function(req,res){
        let product = productsFunctions.detailData(req.params.id);
        if (!product){
            return res.redirect("/products/notFound")
        } else {
            product.pageScript = ["counter"];
            return res.render("products/productDetail",product)
        }
    },

    create: function(req,res){
        let data = functions.productFormData("Crear Producto", null)
        res.render("products/productCreateForm", data)
    },

    store: function(req,res){
        let errors = validationResult(req);
        let old = functions.productFormData("Crear Producto",req.body);
        if (errors.isEmpty()){
            let id = productsFunctions.newProduct(req.body, req.file);
            return res.redirect("/products/" + id);
        } else {
            old.errors = errors.mapped();
            return res.render('products/productCreateForm',old);
        }
    },

    edit: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        if (!product){
            return res.redirect("/products/notFound")
        }else{
            let data = functions.productFormData("Editando - " + product.name, product);
            return res.render("products/productEditForm", data)
        }
    },

    update: function(req,res){
        let errors = validationResult(req); 
        let data = req.body;
        data.id = req.params.id;
        let old = functions.productFormData(`Editando - ${req.body.name}`, data);

        if (errors.isEmpty()){
            let id = productsFunctions.editProduct(data.id, data, req.file);
            return res.redirect("/products/" + id);
        } else {
            old.errors = errors.mapped();
            return res.render('products/productEditForm',old);
        }
    },

    delete: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        let info = functions.productData(`Eliminando - ${product.name}`, product, "Producto");
        info.path = "products"

        if (!product){
            return res.redirect("/products/notFound")
        }else{
            res.render("confirmDelete", info);
        }
    },

    destroy: function(req,res){
        productsFunctions.deleteProduct(req.params.id);
		res.redirect("/");
    },

    productNotFound: function(req, res){
        let title = "Producto no encontrado";
        return res.render("products/allProducts",functions.productData(title, [], title))
    }
}
module.exports = productsController