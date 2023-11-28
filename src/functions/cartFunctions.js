const fs = require('fs');
const path = require('path');
const productFunctions = require("../functions/productsFunctions")
const userFunctions = require("../functions/usersFunctions")
const functions = require("../functions/functions")

const cartFunctions = {

    pathDB: path.join(__dirname, '../data/cartDataBase.json'),

    allEntries: function()  {
        let cart = [];
        let readCart = fs.readFileSync(this.pathDB, 'utf-8');
        if (readCart != ""){
            cart = JSON.parse(readCart);
        };
        return cart;
    },

    filterByID : function(id){        
        let data = this.allEntries();
        return data.filter(cart => cart.id == id)
    },

    filterByKey: function(data,key){
        let alldata = this.allEntries();
        return alldata.filter(cart => cart[key] == data)
    },

    newId: function(){
        let lastEntry = this.allEntries().pop();
		if (lastEntry){
            return lastEntry.id + 1
        }
        return 1
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data, null, ' ') );
        return true
    },

    newEntry: function(userID,productID,quantity){
        let userEntries = this.filterByKey(userID,"userID");
        let productEntry = userEntries.filter(entry => entry.productID == productID)[0];
        let pq = parseInt(quantity);
        if (productEntry){
            pq = pq + productEntry.quantity;
            this.editProduct(productEntry.id,pq);
        }else{
            let newEntry = {
                id: 			this.newId(),
                userID:         parseInt(userID),
                productID:      parseInt(productID),
                quantity:       parseInt(pq)
            };
            let entries = this.allEntries();
            entries.push(newEntry);
            this.store(entries);
        }
        return this.filterByKey(userID,"userID");
    },

    editProduct: function(id,data){
        let entries = this.allEntries();
        for (const entry of entries) {
			if(entry.id == id){
				entry.quantity = data
            };
        };
        this.store(entries);
        return id
    },

    deleteProduct: function(id){
        let entries = this.allEntries();
        let newEntries = entries.filter((entry)=> entry.id != id);
		this.store(newEntries);
        return true
    },

    processCartData : function(userID){
        let allEntries = this.filterByKey(userID,"userID")
        let user = userFunctions.filterByID(userID)[0]
        let allproducts = []
        let cartAmount = 0
        for (const entry of allEntries) {
            let product = productFunctions.filterByID(entry.productID)[0]
            let finalPrice = functions.finalPrice(product);
            let data = {
                image:      product.image,
                name:       product.name,
                amount:      finalPrice*entry.quantity,
                finalPrice: finalPrice,
                quantity:   entry.quantity,
                cartID:     entry.id
            }
            cartAmount = cartAmount + data.amount;
            allproducts.push(data)
        }
        let cartData = {
            toThousand: functions.toThousand,
            cartAmount: cartAmount,
            username: user.username,
            title: "Carrito de " + user.username,
            products: allproducts
        }
        return cartData
    },

    editCartData: function(id){
        let entry = this.filterByID(id)[0];
        console.log(entry);
        let user = userFunctions.filterByID(entry.userID)[0]
        let product = productFunctions.filterByID(entry.productID)[0]
        let finalPrice = functions.finalPrice(product);
        let data = {
            username: user.username,
            price: finalPrice,
            product: product.name,
            image: product.image,
            quantity: entry.quantity,
            toThousand: functions.toThousand,
            title: "Editando producto de carrito"
        }
        return data
    }

}

module.exports = cartFunctions