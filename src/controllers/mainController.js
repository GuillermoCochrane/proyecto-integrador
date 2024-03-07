const tools = require("../functions/functions")
const productsFunctions =require("../functions/productsFunctions")

const mainController ={
    index: function(req,res){
        let mostViewed = productsFunctions.sortByViews();
        let topData = productsFunctions.arrayReducer(mostViewed,8)
        let bottomData = productsFunctions.filterByKey(2,"status")
        let topTitle = "Más Buscados"
        let bottomTitle = "Novedades"
        if(req.session.userlogged){
            let userPreferences = productsFunctions.recomended(req.session.userlogged);
            if (userPreferences.userPreferences.length !=0 ){
                topData = userPreferences.userPreferences;
            } else{
                topData = productsFunctions.filterByKey(4,"status")
            }
            topTitle = userPreferences.title;
        }
        res.render("home",{
            sectionTop: {
                data: topData,
                title: topTitle
            },
            sectionBottom: {
                data: bottomData,
                title: bottomTitle
            },
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

    help: function(req,res){
        res.render("reference"/* ,{
            title: "Mapa del sitio" + tools.title,
            status: tools.allStatus(),
            categories: tools.allCategories()
        } */)
    },

    status: function(req,res){
        res.redirect("/products/status/"+req.body.status)
    },

    category:   function(req,res){
        res.redirect("/products/category/"+req.body.category)
    },

    redirect: function(req,res){
        res.redirect('/');
    },

}
module.exports = mainController
