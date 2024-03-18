const tools = require("../functions/functions")
const productsFunctions =require("../functions/productsFunctions")

const mainController ={
    index: function(req,res){
        let data = productsFunctions.homeData();

        if(req.session.userlogged){
            let userPreferences = productsFunctions.recomended(req.session.userlogged);
            if (userPreferences.userPreferences.length != 0 ){
                data.sectionTop.data = userPreferences.userPreferences;
            } else{
                data.sectionTop.data = productsFunctions.filterByKey(4,"status");
            }
            data.sectionTop.title = userPreferences.title;
        }

        return res.render("home",data)
    },

    search: function(req,res){
        let data = productsFunctions.searchData(req.query.search);
        return res.render("allProducts", data)
    },

    help: function(req,res){
        return res.render("help",{
            title: "Mapa del sitio" + tools.title,
            status: tools.allStatus(),
            categories: tools.allCategories()
        })
    },

    status: function(req,res){
        return res.redirect("/products/status/"+req.body.status)
    },

    category:   function(req,res){
        return res.redirect("/products/category/"+req.body.category)
    },

    redirect: function(req,res){
        return res.redirect('/');
    },

}
module.exports = mainController
