const fs = require('fs');
const path = require('path');
const functions = require("./functions");
const userFunctions = require("./usersFunctions");
const productFunctions = require("./productsFunctions");
const mailFunctions = require("./mailFunction");
const salesFunctions = require("../functions/salesFunctions");

const dashboardFunctions ={

    pathSummaryDB: path.join(__dirname,"../data/sumaryDataBase.json"),

    dashboardLink: "/dashboard",

    basicData: {
        counter: 0,
        toThousand: functions.toThousand,
    },

    summary: function()  {
        let summary = [];
        let readSummary = fs.readFileSync(this.pathSummaryDB, 'utf-8');
        if (readSummary != ""){
            summary = JSON.parse(readSummary);
        };
        return summary;
    },

    summaryData: function(){
        let summaryData = this.summary();
        let itemQuantity ={
            1: userFunctions.allUsers().length,
            2: productFunctions.allProducts().length,
            3: functions.allCategories().length,
            4: functions.allStatus().length, 
        };
        let none = 0;
        for (const item of summaryData) {
            item.quantity =  itemQuantity[item.id] || none;
        }
        return summaryData
    },

    dashboardCategoryStatus: function(){
        let data = {
            categories: functions.allCategories(),
            statuses:   functions.allStatus(),
            title:      "Categorías / Estados",
            tab:        1,
            status:     null,
            category:   null,
        };
        return data
    },

    dashboardHomeData: function(){
        let data = {
            title:        "Panel de Control" + functions.title, 
            data:         this.summaryData(),
            categories:   functions.addKeyName(functions.allCategories(),"category"),
            status:       functions.addKeyName(functions.allStatus(),"status"),
            mostSold:     productFunctions.sortBySales().shift(),
        };
        return data
    },

    dashboardMailData: function(){
        let data = {
            title: mailFunctions.configTitle,
            data: {
                email: mailFunctions.mail(),
                pass: mailFunctions.pass()
            }
        }
        return data
    },

    productDetailData: function(id) {
        let product = productFunctions.filterByID(id)[0];
        if (!product){
            return false
        } else {
            product.finalPrice =  functions.finalPrice(product);
            let data =              this.basicData;

            data.title =            product.name;
            data.dashboardlink =    this.dashboardLink;
            data.product =          product;
            delete data.counter;

            return data
        }
    },

    usersData: function(){
        let title = "Todas los Usuarios";
        let data = {
            title,
            label:          title,
            searchRoute:    "searchUsers",
            dashboardlink:  this.dashboardLink,
            users:          userFunctions.allUsers(),
            categories:     functions.allCategories(),
        }
        return data
    },

    salesData: function(){
        let allSales = salesFunctions.allSales();
        let data = this.basicData;

        data.title =    "Todas las ventas";
        data.label =    data.title;
        data.label2 =   "Ventas pendientes de entrega";
        data.data =     salesFunctions.addUsername(allSales);

        return data
    },

    filterSalesData: function(allSales){
        let title = "Filtrar ventas";
        let data = this.basicData;

        data.title =    title;
        data.label =    data.title;
        data.data =     salesFunctions.addUsername(allSales);
        data.years =    salesFunctions.allYears();
        data.months =   functions.allMonths();

        return data
    },

    saleDetailData: function(id){
        let sale = salesFunctions.filterByKey(id,"id");
        let data = this.basicData;

        data.title = "Detalle de venta";
        data.sale = salesFunctions.addUsername(sale)[0];

        return data
    },

/*     userFunctions: userFunctions,

    productFunctions: productFunctions,

    mailfunctions: mailFunctions,

    functions: functions,

    salesFunctions: salesFunctions, */
}

module.exports = dashboardFunctions