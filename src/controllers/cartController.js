const cartFunctions = require("../functions/cartFunctions")
const productFunctions = require("../functions/productsFunctions")
const functions = require("../functions/functions")
const mainController ={
    index: function(req,res){
        let userID = req.session.userlogged.id;
        let allEntries = cartFunctions.filterByKey(userID,"userID");
        let allproducts = []
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
            allproducts.push(data)
        }
        /* res.send(allproducts) */
        res.render("cart", {
            title: "Bienvenido",
            products: allproducts
        })
    },

    add: function(req,res){
        let userID = req.session.userlogged.id;
        let productID = req.params.id;
        let quantity = req.body.quantity;
        let usercart = cartFunctions.newEntry(userID,productID,quantity)
        res.send( usercart );
    }

}
module.exports = mainController
