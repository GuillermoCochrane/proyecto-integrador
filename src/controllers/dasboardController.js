let productsFunctions = require("../functions/productsFunctions");
let functions = require("../functions/functions");
let userFunctions = require("../functions/usersFunctions");
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

    allProducts: function(req,res){
        let products = productsFunctions.allProducts();
        let title = "Todos los productos";
        let label = title;
        let dashboardlink = "/dashboard";

        if(req.query.search){
            let searchResults = productsFunctions.search(req.query.search);
            products = searchResults.results;
            label = searchResults.label;
            title = searchResults.label;
        }

        let data = functions.productData(title, products, label );
        data.categories = functions.allCategories();
        data.searchRoute = "searchProducts";
        data.dashboardlink = dashboardlink
        return res.render("dashboardProducts", data)
    },

    product: function(req,res){
        res.redirect("/products/" + req.params.id )
    },

    allUsers: function(req,res){
        let users = userFunctions.allUsers();
        let title = "Todas los Usuarios";
        let label = title;
        let categories = functions.allCategories();
        let searchRoute = "searchUsers";
        let dashboardlink = "/dashboard";

        if(req.query.search){
            let searchResults = userFunctions.search(req.query.search);
            users = searchResults.results;
            label = searchResults.label;
            title = searchResults.label;
        }
        return res.render("dashboardUsers",{
            title,
            label,
            users,
            categories,
            searchRoute,
            dashboardlink
        })
    },

    user: function(req,res){
        res.redirect("/users/" + req.params.id )
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