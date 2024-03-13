const functions = require("./functions");
const userFunctions = require("./usersFunctions");
const productFunctions = require("./productsFunctions");
const mailfunctions = require("./mailFunction");

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

    summaryData: function(users,products){
        let summaryData = this.summary();
        let itemQuantity ={
            1: userFunctions.allUsers().length,
            2: productFunctions.allProducts().length,
            3: userFunctions.allCategories()-length, //(this.allCategories()).length,
            4: userFunctions.allStatus(), //(this.allStatus()).length,
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

    dashboardHomeData: function(allUsers, allProducts, productSorted){
        let data = {
            title:        "Panel de Control" + this.title, 
            data:         this.summaryData(allUsers,allProducts),
            categories:   this.addKeyName(this.allCategories(),"category"),
            status:       this.addKeyName(functions.allStatus(),"status"),
            mostSold:     productSorted.shift(),
        };
        return data
    },

    userFunctions: userFunctions,

    productFunctions: productFunctions,

    mailfunctions: mailfunctions,

    functions: functions,
}

module.exports = dashboardFunctions