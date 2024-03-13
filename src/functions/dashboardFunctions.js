const fs = require('fs');
const path = require('path');
const functions = require("./functions");
const userFunctions = require("./usersFunctions");
const productFunctions = require("./productsFunctions");
const mailfunctions = require("./mailFunction");
const salesFunctions = require("../functions/salesFunctions");

const dashboardFunctions ={

    pathSummaryDB: path.join(__dirname,"../data/sumaryDataBase.json"),

    dashboardLink: "/dashboard",

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
            3: (functions.allCategories()).length,
            4: functions.allStatus().length, //(this.allStatus()).length,
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
            title: "Categorías / Estados",
            tab: 1,
            status: null,
            category: null,
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

    userFunctions: userFunctions,

    productFunctions: productFunctions,

    mailfunctions: mailfunctions,

    functions: functions,

    salesFunctions: salesFunctions,
}

module.exports = dashboardFunctions