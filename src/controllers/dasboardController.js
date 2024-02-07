let productsFunctions = require("../functions/productsFunctions");
let functions = require("../functions/functions");
let dasboardController = {
    index: function(req,res){
        return res.render("dashboardMain",{
            title: "Panel de Control" 
        })
    },
    email: function(req,res){
        return res.render("dashboardMain",{ 
            title: "Modificar E-mail del sitio" 
        })
    },
    newProduct: function(req,res){
        return res.render("dashboardMain",{
            title: "Crear nuevo producto" 
        })
    },
    search: function(req,res){
        let products = productsFunctions.allProducts();
        let title = "Todos los productos";
        let label = title;

        if(req.query.search){
            let searchResults = productsFunctions.search(req.query.search);
            products = searchResults.results;
            label = searchResults.label;
        }
        let data = functions.productData(title, products, label )
        data.categories = functions.allCategories()
        return res.render("dashboardProductSearch", data)
    },
    allUsers: function(req,res){
        return res.render("dashboardMain",{
            title: "Todos los usuarios" 
        })
    },
    allSales: function(req,res){
        return res.render("dashboardMain",{
            title: "Todas las ventas"
        })
    },
    pendingSales: function(req,res){
        return res.render("dashboardMain",{
            title: "Ventas pendietes"
        })
    },
    allCategories: function(req,res){
        return res.render("dashboardMain",{
            title: "Todas las categorías"
        })
    },
    newCategory: function(req,res){
        return res.render("dashboardMain",{
            title: "Crear nueva categoría" 
        })
    },
    
};

module.exports = dasboardController;