const productsFunctions = require("../functions/productsFunctions");
const functions = require("../functions/functions");

const productsController ={

    index: function(req,res){
        res.render("allProducts",{
            title: "Todos los productos" + functions.title,
            products: productsFunctions.allProducts(),
            label: "Todos los productos",
            toThousand: functions.toThousand,
        })
    },
    
    category: function(req,res){
        let data = productsFunctions.productsByCategory(req.params.idCat);
        res.render("allProducts",{
            products: data.products,
            title:  "Productos: " + data.category + functions.title,
            label: "Productos: " + data.category,
            toThousand: functions.toThousand,
        })
    },

    status: function(req,res){
        let data = productsFunctions.productsByStatus(req.params.idStatus);
        res.render("allProducts",{
            products: data.products,
            title:  "Productos: " + data.status + functions.title,
            label: "Productos: " + data.status,
            toThousand: functions.toThousand,
        })
    },

    detail: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        if (!product){
            return res.redirect("/products/notFound")
        } else {
            if(product){
                product.finalPrice =  functions.finalPrice(product);
            }
            return res.render("productDetail",{
                title: product.name,
                product: product,
                toThousand: functions.toThousand
            })
        }
    },

    create: function(req,res){
        res.render("productCreateForm",{
            title: "Crear Producto" + functions.title,
            status: functions.allStatus(),
            categories: functions.allCategories()
        })
    },

    store: function(req,res){
        let file = req.file;
        if (file){
            if(functions.extValidator(file)){
                let old = functions.productFormData("Crear Producto",req.body);
                old.error = "El formato del archivo es incompatible";
                res.render('productCreateForm',old)
            }
            let id = productsFunctions.newProduct(req.body, file);
            res.redirect("/products/" + id);
        } else {
            let old = functions.productFormData("Crear Producto",req.body);
            old.error = "Hubo un problema en la carga de la imagen";
            res.render(res.render('productCreateForm',old))
        }
    },

    edit: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        if (!product){
            return res.redirect("/products/notFound")
        }else{
            return res.render("productEditForm",{
                title: "Editando - " + product.name,
                status: functions.allStatus(),
                categories: functions.allCategories(),
                product: product
            })
        }
    },

    update: function(req,res){
        let id = productsFunctions.editProduct(req.params.id, req.body);
		res.redirect("/products/" + id)
    },

    delete: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        if (!product){
            return res.redirect("/products/notFound")
        }else{
        res.render("confirmDelete",{
            product: product,
            title: "Eliminando - " + product.name,
            label: "Producto",
            path: "products",
        })}
    },

    destroy: function(req,res){
        productsFunctions.deleteProduct(req.params.id);
		res.redirect("/");
    },

    productNotFound: function(req, res){
        return res.render("allProducts",{
            products: [],
            title:  "Producto no encontrado" + functions.title,
            label: "Producto no encontrado",
        })
    }
}
module.exports = productsController
