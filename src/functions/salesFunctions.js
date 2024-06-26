const fs = require('fs');
const path = require('path');
const productFunctions = require("./productsFunctions");
const functions = require("./functions");
const cartFunctions = require("./cartFunctions");

const salesFunctions = {

    pathDB: path.join(__dirname,"../data/salesDataBase.json"),

    allSales: function()  {
        let sales = [];
        let readSales = fs.readFileSync(this.pathDB, 'utf-8');
        if (readSales != ""){
            sales = JSON.parse(readSales);
        };
        return sales;
    },

    filterByID : function(id){        
        let data = this.allSales();
        return data.filter(sale => sale.id == id);
    },

    filterByKey: function(data,key){
        let alldata = this.allSales();
        return alldata.filter(sale => sale[key] == data);
    },

    newId: function(){
        let lastEntry = this.allSales().pop();
		if (lastEntry){
            return lastEntry.id + 1;
        }
        return 1;
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data, null, ' ') );
        return true;
    },

    purchasesCounter: function(userId){
        purchases = this.filterByKey(userId, "userID");
        let counter = 1;
        if(purchases){
            for (const purchase of purchases) {
                purchase.counter = counter
                counter = counter + 1
            }
        }
        return purchases;
    },

    newSale: function(userID){
        let cartEntries = cartFunctions.filterByKey(userID,"userID");
        let products = [];
        let amount = 0;
        let quantity = 0
        let date = new Date()
        if(cartEntries.length != 0){
            for (const entry of cartEntries) {
                let product = productFunctions.filterByID(entry.productID)[0];
                let finalPrice = functions.finalPrice(product);
                let data = {
                    name:       product.name,
                    image:      product.image,
                    finalPrice: finalPrice,
                    quantity:   entry.quantity,
                    amount:     finalPrice*entry.quantity,
                };
                productFunctions.productSales(product.id,data.quantity);
                products.push(data);
                amount = amount + data.amount;
                quantity = quantity + data.quantity;
                cartFunctions.deleteEntry(entry.id);
            };
            let currentSale = {
                id: this.newId(),
                userID: userID,
                amount: amount,
                quantity: quantity,
                products: products,
                undelivered: true,
                day: date.getDate(),
                month: (date.getMonth())+1,
                year: date.getFullYear()
            };
            let sales = this.allSales();
            sales.push(currentSale);
            this.store(sales);
            return currentSale 
        } else {
            return false
        }
    },

    processDeliver: function(saleID){
        let sales = this.allSales();
        for (const sale of sales) {
            if(sale.id == saleID){
                sale.undelivered = false
            }}
            this.store(sales);
            return true
    },

    allYears: function(){
        let years = this.allSales();
        years.sort((a,b)=> b.year - a.year)
        let firstYear = years.pop();
        let lastYear = years.shift();
        let allYears = [{
            id: 0,
            year: "Todos los años"
        }];
        for (let data = firstYear.year; data <= lastYear.year; data++) {
            let idYear = allYears.length
            allYears.push({
                id: idYear,
                year: data
            });
        }
        return allYears
    },
};

module.exports = salesFunctions;