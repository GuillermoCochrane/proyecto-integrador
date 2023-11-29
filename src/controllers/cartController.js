const cartFunctions = require("../functions/cartFunctions")
const productFunctions = require("../functions/productsFunctions");
const userFunctions = require("../functions/usersFunctions");
const functions = require("../functions/functions")

const mainController ={
    index: function(req,res){
        let userID = req.session.userlogged.id;
        let cartData = cartFunctions.processCartData(userID)
        return res.render("cart", cartData)
    },

    add: function(req,res){
        let userID = req.session.userlogged.id;
        let productID = req.params.id;
        let quantity = req.body.quantity;
        cartFunctions.newEntry(userID,productID,quantity)
        return res.redirect('/products')
    },

    edit: function(req,res){
        let id = req.params.id;
        let data = cartFunctions.editCartData(id)
        res.render("cartEdit", data)
    },

    update: function(req,res){
        cartFunctions.editEntry(req.params.id, req.body.quantity)
        res.redirect("/cart")
    },

    delete: function(req,res){
        let entry = cartFunctions.filterByID(req.params.id)[0];
        let product = productFunctions.filterByID(entry.productID)[0];
        let title = "Eliminando - " + product.name;
        let info = functions.productData(title, product, "Entrada")
        info.path = "cart"
        info.products.id = req.params.id
        if (!product){
            return res.redirect("/products/notFound")
        }else{
            res.render("confirmDelete", info);
        }
    },

    destroy: function(req,res){
        cartFunctions.deleteEntry(req.params.id) //productsFunctions.deleteProduct(req.params.id);
		res.redirect("/cart")
    },
}
module.exports = mainController
