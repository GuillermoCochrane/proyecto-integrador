const fs = require('fs');
const path = require('path');
const productFunctions = require("./productsFunctions");
const userFunctions = require("./usersFunctions");
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
                products.push(data);
                amount = amount + data.amount;
                quantity = quantity + data.quantity;
                cartFunctions.deleteEntry(entry.id);
            };
            let sale ={
                id: this.newId(),
                userID: userID,
                amount: amount,
                quantity: quantity,
                products: products,
                day: date.getDate(),
                month: (date.getMonth())+1,
                year: date.getFullYear()
            };
            let sales = this.allSales();
            sales.push(sale);
            this.store(sales);
            return sale
        } else {
            return false
        }
    }
};

module.exports = salesFunctions;