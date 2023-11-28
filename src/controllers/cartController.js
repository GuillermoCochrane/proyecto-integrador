const cartFunctions = require("../functions/cartFunctions")

const mainController ={
    index: function(req,res){
        let userID = req.session.userlogged.id;
        let cartData = cartFunctions.processCartData(userID)
        res.render("cart", cartData)
    },

    add: function(req,res){
        let userID = req.session.userlogged.id;
        let productID = req.params.id;
        let quantity = req.body.quantity;
        let usercart = cartFunctions.newEntry(userID,productID,quantity)
        res.redirect('/products')
    }

}
module.exports = mainController
