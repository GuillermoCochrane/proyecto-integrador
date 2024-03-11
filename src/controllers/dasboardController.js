const productsFunctions = require("../functions/productsFunctions");
const functions = require("../functions/functions");
const userFunctions = require("../functions/usersFunctions");
const mailFunctions = require("../functions/mailFunction");
const salesFunctions = require("../functions/salesFunctions");
const { validationResult } = require('express-validator');

const dasboardController = {
    index: function(req,res){
        let users = userFunctions.allUsers();
        let products = productsFunctions.allProducts()
        let data = functions.summaryData(users,products);
        return res.render("dashboardMain",{
            title: "Panel de Control", 
            data
        })
    },

    email: function(req,res){
        let data = {
            email: mailFunctions.mail(),
            pass: mailFunctions.pass()
        };
        return res.render("dashboardEditEmail",{ 
            title: "Configurar E-Mail del sitio",
            data
        })
    },

    updateEmail: function(req,res){
        let errors = validationResult(req);
        let title = "Configurar E-Mail del sitio";
        let data = req.body;
        let old = { 
            title,
            data,
            errors: errors.mapped()
        }
        if (errors.isEmpty()){
            mailFunctions.editMailData(req.body);
            return res.redirect("/dashboard/email");
        } else {
            return res.render('dashboardEditEmail',old);
        }
    },

    newProduct: function(req,res){
        let data = functions.productFormData("Crear Producto", null);
        let dashboardlink = "/dashboard";
        data.dashboardlink = dashboardlink;
        return res.render("dashboardProductsForm", data)
    },

    store: function(req,res){
        let errors = validationResult(req);
        let dashboardlink = "/dashboard";
        let old = functions.productFormData("Crear Producto",req.body);
        if (errors.isEmpty()){
            let id = productsFunctions.newProduct(req.body, req.file);
            return res.redirect("/dashboard/products/" + id);
        } else {
            old.errors = errors.mapped();
            old.dashboardlink = dashboardlink;
            return res.render('dashboardProductsForm',old)
        }
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
        data.dashboardlink = dashboardlink;
        return res.render("dashboardProducts", data)
    },

    product: function(req,res){
        let dashboardlink = "/dashboard";
        let product = productsFunctions.filterByID(req.params.id)[0];
        if (!product){
            return res.redirect("/dashboard/notFound")
        } else {
            if(product){
                product.finalPrice =  functions.finalPrice(product);
            }
            return res.render("dashProductDetail",{
                title: product.name,
                product: product,
                toThousand: functions.toThousand,
                dashboardlink
            })
        }
    },

    editProduct: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        let dashboardlink = "/dashboard";
        if (!product){
            return res.redirect("/dashboard/notFound")
        }else{
            let data = functions.productFormData("Editando - " + product.name, product);
            data.edit = true;
            data.dashboardlink = dashboardlink;
            return res.render("dashboardProductsForm", data)
        }
    },

    update: function(req,res){
        let errors = validationResult(req);
        let title = "Editando - " + req.body.name;
        let dashboardlink = "/dashboard";
        let data = req.body;
        data.id = req.params.id
        let old = functions.productFormData(title, data);
        if (errors.isEmpty()){
            let id = productsFunctions.editProduct(data.id, data, req.file);
            return res.redirect("/dashboard/products/" + id);
        } else {
            old.errors = errors.mapped();
            old.dashboardlink = dashboardlink;
            return res.render('dashboardProductsForm',old);
        }
    },

    delete: function(req,res){
        let product = productsFunctions.filterByID(req.params.id)[0];
        let title = "Eliminando - " + product.name;
        let info = functions.productData(title, product, "Producto");
        info.path = "dashboard/products"
        if (!product){
            return res.redirect("/products/notFound")
        }else{
            return res.render("dashboardConfirmDelete", info);
        }
    },

    destroy: function(req,res){
        productsFunctions.deleteProduct(req.params.id);
		return res.redirect("/dashboard/products");
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
        let user = userFunctions.filterByID(req.params.id)[0];
        return res.render("dashboardUserDetail",{
            title: "Detalle del usuario" + user.username,
            categories: functions.allCategories(),
            user
        })
    },

    profile: function(req,res){
        userFunctions.changeProfile(req.params.id);
        return res.redirect("/dashboard/users")
    },

    allSales: function(req,res){
        let allSales = salesFunctions.allSales();
        let data = salesFunctions.addUsername(allSales);
        let title = "Todas las ventas";
        let label = title;
        return res.render("dashboardSales",{
            title,
            label,
            data,
            label2: "Ventas pendientes de entrega",
            counter: 0,
            toThousand: functions.toThousand
        })
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

        if(req.body.day){
            let date = (req.body.day).split("-");
            allSales = allSales.filter(sale => sale.year == date[0]);
            allSales = allSales.filter(sale => sale.month == date[1]);
            allSales = allSales.filter(sale => sale.day == date[2]);
        }

        let data = salesFunctions.addUsername(allSales);
        let title = "Filtrar ventas";
        let label = title;
        let years = salesFunctions.allYears();
        let months = functions.allMonths();

        return res.render("dashboardFilterSales",{
            title,
            label,
            data,
            years,
            months,
            counter: 0,
            toThousand: functions.toThousand
        })
    },

    deliverSale: function(req,res){
        salesFunctions.processDeliver(req.params.saleID);
        return res.redirect("/dashboard/sales")
    },

    saleDetail: function(req,res){
        let sale = salesFunctions.filterByKey(req.params.saleID,"id");
        sale = salesFunctions.addUsername(sale)[0];
        title = "Detalle de venta";
        return res.render("dashboardSaleDetail",{
            title,
            sale,
            counter: 0,
            toThousand: functions.toThousand
        })
    },

    allCategories: function(req,res){
        let data = functions.dashboardCategoryStatus();
        let statusID = req.params.idStatus;
        let categoryID = req.params.idCategory;
        if(statusID){
            data.status = functions.statusByID(statusID);
            data.tab = 2;
        };
        if(categoryID){
            data.category = functions.categoryByID(categoryID);
        };
        return res.render("dashboardCategories", data )
    },

    newCategory: function(req,res){
        let errors = validationResult(req);
        let data = functions.dashboardCategoryStatus();
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
        let data = functions.dashboardCategoryStatus();
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
        let data = functions.dashboardCategoryStatus();
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
        let data = functions.dashboardCategoryStatus();
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

    productNotFound: function(req, res){
        let title = "Producto no encontrado";
        return res.render("dashboardMain",{
            title
        })
    }

};

module.exports = dasboardController;