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
        return res.render("dashboardMain",{
            title: "Todos los productos" 
        })
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