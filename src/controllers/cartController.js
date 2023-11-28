const cartFunctions = require("../functions/cartFunctions")
const mainController ={
    index: function(req,res){
        let userID = req.session.userlogged.id;
        res.send(cartFunctions.filterByKey(userID, "userID"))
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
