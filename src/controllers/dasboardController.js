const productsFunctions = require("../functions/productsFunctions");
const functions = require("../functions/functions");
const userFunctions = require("../functions/usersFunctions");
const mailFunctions = require("../functions/mailFunction");
const salesFunctions = require("../functions/salesFunctions");
const dashboardFunctions = require("../functions/dashboardFunctions");
const { validationResult } = require('express-validator');

const dasboardController = {
    index: function(req,res){
        let info = dashboardFunctions.dashboardHomeData();
        return res.render("dashboardMain", info)
    },

    email: function(req,res){
        let data = dashboardFunctions.dashboardMailData();
        return res.render("dashboardEditEmail", data)
    },

    updateEmail: function(req,res){
        let errors = validationResult(req);
        let data = req.body;
        let old = { 
            title: dashboardFunctions.dashboardMailData().title,
            errors: errors.mapped(),
            data
        }
        if (errors.isEmpty()){
            mailFunctions.editMailData(data);
            return res.redirect("/dashboard/email");
        } else {
            return res.render('dashboardEditEmail',old);
        }
    },

    newProduct: function(req,res){
        let data = functions.productFormData("Crear Producto", null);
        data.dashboardlink = dashboardFunctions.dashboardLink;
        return res.render("dashboardProductsForm", data)
    },

    store: function(req,res){
        let errors = validationResult(req);
        let old = functions.productFormData("Crear Producto",req.body);
        if (errors.isEmpty()){
            let id = productsFunctions.newProduct(req.body, req.file);
            return res.redirect("/dashboard/products/" + id);
        } else {
            old.errors = errors.mapped();
            old.dashboardlink = dashboardFunctions.dashboardLink;
            return res.render('dashboardProductsForm',old)
        }
    },

    allProducts: function(req,res){
        let products = productsFunctions.allProducts();
        let title = "Todos los productos";
        let dashboardlink = dashboardFunctions.dashboardLink;

        if(req.params.idCategory){
            let data = productsFunctions.productsByCategory(req.params.idCategory);
            title = "Productos: " + data.category;
            products = data.products;
            label = title;
        }

        if(req.params.idStatus){
            let data = productsFunctions.productsByStatus(req.params.idStatus);
            title = "Productos: " + data.status;
            products = data.products;
            label = title;
        }

        if(req.query.search){
            let searchResults = productsFunctions.search(req.query.search);
            products = searchResults.results;
            label = searchResults.label;
            title = searchResults.label;
        }

        let data = functions.productData(title, products, title);
        data.categories = functions.allCategories();
        data.searchRoute = "searchProducts";
        data.dashboardlink = dashboardlink;
        data.scripts = ["dashboard"];
        return res.render("dashboardProducts", data )
    },

    product: function(req,res){
        let data = dashboardFunctions.productDetailData(req.params.id)
        if (data){
            return res.render("dashProductDetail", data)
        } else {
            return res.redirect("/dashboard/notFound/product")
        }
    },

    editProduct: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        if (!product){
            return res.redirect("/dashboard/notFound/product")
        }else{
            let data = functions.productFormData("Editando - " + product.name, product);
            data.edit = true;
            data.dashboardlink = functions.dashboardLink;
            return res.render("dashboardProductsForm", data)
        }
    },

    update: function(req,res){
        let errors = validationResult(req);
        let title = "Editando - " + req.body.name;
        let data = req.body;
        data.id = req.params.id
        let old = functions.productFormData(title, data);
        if (errors.isEmpty()){
            let id = productsFunctions.editProduct(data.id, data, req.file);
            return res.redirect("/dashboard/products/" + id);
        } else {
            old.errors = errors.mapped();
            old.dashboardlink = functions.dashboardLink;
            return res.render('dashboardProductsForm',old);
        }
    },

    delete: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        let title = "Eliminando - " + product.name;
        let info = functions.productData(title, product, "Producto");
        info.path = "dashboard/products";
        if (!product){
            return res.redirect("/dashboard/notFound/product")
        }else{
            return res.render("dashboardConfirmDelete", info);
        }
    },

    destroy: function(req,res){
        productsFunctions.deleteProduct(req.params.id);
		return res.redirect("/dashboard/products");
    },

    allUsers: function(req,res){
        let data = dashboardFunctions.usersData();
        if(req.query.search){
            let searchResults = userFunctions.search(req.query.search);
            data.users = searchResults.results;
            data.label = searchResults.label;
            data.title = searchResults.label;
        }
        data.scripts = ["dashboard"];
        return res.render("dashboardUsers",data)
    },

    user: function(req,res){
        let user = userFunctions.filterByID(req.params.id)[0];
        if (user){
            return res.render("dashboardUserDetail",{
                title: "Detalle del usuario" + user.username,
                categories: functions.allCategories(),
                user
            })
        } else {
            return res.redirect("/dashboard/notFound/user")
        }
    },

    profile: function(req,res){
        userFunctions.changeProfile(req.params.id);
        return res.redirect("/dashboard/users")
    },


    allSales: function(req,res){
        let data = dashboardFunctions.salesData();
        data.scripts = ["dashboard"];
        return res.render("dashboardSales", data)
    },

    filterSales: function(req,res){
        let allSales = salesFunctions.allSales();

        if(req.body.year){
            if(req.body.year !=0){
                allSales = allSales.filter(sale => sale.year == req.body.year);
            }
        }

        if(req.body.month){
            if(req.body.month !=0){
                allSales = allSales.filter(sale => sale.month == req.body.month);
            }
        }

        if(req.body.dayNumber){
            if(req.body.dayNumber !=0){
                allSales = allSales.filter(sale => sale.day == req.body.dayNumber);
            }
        }

        if(req.body.day){
            let date = (req.body.day).split("-");
            allSales = allSales.filter(sale => sale.year == date[0]);
            allSales = allSales.filter(sale => sale.month == date[1]);
            allSales = allSales.filter(sale => sale.day == date[2]);
        }

        let data = dashboardFunctions.filterSalesData(allSales);
        data.scripts = ["dashboard", "filtersales"];

        return res.render("dashboardFilterSales",data)
    },

    deliverSale: function(req,res){
        salesFunctions.processDeliver(req.params.saleID);
        return res.redirect("/dashboard/sales")
    },

    saleDetail: function(req,res){
        let data = dashboardFunctions.saleDetailData(req.params.saleID);
        if(!data.sale){
            return res.redirect("/dashboard/notFound/sale")
        } else {
            return res.render("dashboardSaleDetail", data)
        }
        
    },

    allCategories: function(req,res){
        let data = dashboardFunctions.dashboardCategoryStatus();
        let statusID = req.params.idStatus;
        let categoryID = req.params.idCategory;

        if(statusID){
            let status = functions.statusByID(statusID);
            if (status == undefined){
                return res.redirect("/dashboard/notFound/status")
            }
            data.status = status;
            data.tab = 2;
        };

        if(categoryID){
            let category = functions.categoryByID(categoryID);
            if(category == undefined){
                return res.redirect("/dashboard/notFound/category")
            }
            data.category = category;
        };

        data.scripts = ["dashboard"];
        
        return res.render("dashboardCategories", data )
    },

    newCategory: function(req,res){
        let errors = validationResult(req);
        let data = dashboardFunctions.dashboardCategoryStatus();

        if (errors.isEmpty()){
            functions.newCategory(req.body);
            return res.redirect("/dashboard/categories")
        } else {
            data.errors = errors.mapped();
            return res.render("dashboardCategories", data )
        }
    },

    newStatus: function(req,res){
        let errors = validationResult(req);
        let data = dashboardFunctions.dashboardCategoryStatus();

        if (errors.isEmpty()){
            functions.newStatus(req.body);
            data = functions.dashboardCategoryStatus();
            data.tab = 2;
            return res.render("dashboardCategories", data )
        } else {
            data.errors = errors.mapped();
            data.tab = 2;
            return res.render("dashboardCategories", data )
        }
    },

    editCategory: function(req,res){
        let errors = validationResult(req);
        let data = dashboardFunctions.dashboardCategoryStatus();
        let info = req.body;
        let categoryID = req.params.idCategory;

        if (errors.isEmpty()){
            functions.editCategory(categoryID,info);
            return res.redirect("/dashboard/categories") 
        } else {
            let old = functions.categoryByID(categoryID);
            old.category = info.category;
            data.category = old;
            data.errors = errors.mapped();
            return res.render("dashboardCategories", data )
        }
    },

    editStatus: function(req,res){
        let errors = validationResult(req);
        let data = dashboardFunctions.dashboardCategoryStatus();
        let info = req.body;
        let statusID = req.params.idStatus;

        if (errors.isEmpty()){
            functions.editStatus(statusID,info);
            data = functions.dashboardCategoryStatus();
            data.tab = 2;
            return res.render("dashboardCategories", data ) 
        } else {
            let old = functions.statusByID(statusID);
            old.status = info.status;
            data.status = old;
            data.errors = errors.mapped();
            data.tab = 2;
            return res.render("dashboardCategories", data )
        }
    },

    notFound: function(req, res){
        let title = dashboardFunctions.notFoundTitle(req.params.id)
        return res.render( "dashboardNotFound",{
            title
        })
    },
};

module.exports = dasboardController;