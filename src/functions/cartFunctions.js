const fs = require('fs');
const path = require('path');
const productFunctions = require("../functions/productsFunctions");
const functions = require("../functions/functions");

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
        return data.filter(cart => cart.id == id);
    },

    filterByKey: function(data,key){
        let alldata = this.allEntries();
        return alldata.filter(cart => cart[key] == data);
    },

    newId: function(){
        let lastEntry = this.allEntries().pop();
		if (lastEntry){
            return lastEntry.id + 1;
        }
        return 1;
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data, null, ' ') );
        return true;
    },

    editEntry: function(id,data){
        let entries = this.allEntries();
        for (const entry of entries) {
			if(entry.id == id){
				entry.quantity = parseInt(data);
            };
        };
        this.store(entries);
        return id;
    },

    deleteEntry: function(id){
        let entries = this.allEntries();
        let newEntries = entries.filter((entry)=> entry.id != id);
		this.store(newEntries);
        return true
    },

    newEntry: function(userID,productID,quantity){
        let userEntries = this.filterByKey(userID,"userID");
        let productEntry = userEntries.filter(entry => entry.productID == productID)[0];
        let pq = parseInt(quantity);
        if (productEntry){
            pq = pq + productEntry.quantity;
            this.editEntry(productEntry.id,pq);
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

    cartProductsCounter : function(userID){
        let allEntries = this.filterByKey(userID,"userID");
        let cartProductsCount = 0;
        for (const entry of allEntries) {
            cartProductsCount = cartProductsCount + entry.quantity;
        };
        return cartProductsCount
    },

    cartProducts: function(userID){
        let allEntries = this.filterByKey(userID,"userID");
        let allproducts = [];
        let cartAmount = 0;
        for (const entry of allEntries) {
            let product = productFunctions.filterByID(entry.productID)[0]
            let finalPrice = functions.finalPrice(product);
            let data = {
                image:      product.image,
                name:       product.name,
                amount:     finalPrice*entry.quantity,
                finalPrice: finalPrice,
                quantity:   entry.quantity,
                cartID:     entry.id
            }
            cartAmount = cartAmount + data.amount;
            allproducts.push(data)
        };
        return {
            allproducts,
            cartAmount
        }
    },

    processCartData: function(userID, name){
        let {allproducts, cartAmount} = this.cartProducts(userID);
        let cartData = {
            toThousand: functions.toThousand,
            cartAmount: cartAmount,
            username: name,
            title: "Carrito de " + name,
            products: allproducts
        };
        return cartData
    },

    editCartData: function(id,name){
        let entry = this.filterByID(id)[0];
        let product = productFunctions.filterByID(entry.productID)[0]
        let data = {
            id:         id,
            username:   name,
            product:    product.name,
            image:      product.image,
            quantity:   entry.quantity,
            toThousand: functions.toThousand,
            title:      "Editando entrada de carrito"
        };
        return data
    },

    deleteCartData: function(id){
        let entry = this.filterByID(id)[0];
        let product = productFunctions.filterByID(entry.productID)[0];
        let title = "Eliminando - " + product.name;
        let info = functions.productData(title, product, "Entrada");
        info.path = "cart";
        info.products.id = id;
        return info
    }

}

module.exports = cartFunctions