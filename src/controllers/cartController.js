const cartFunctions = require("../functions/cartFunctions")

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
    }

}
module.exports = mainController
