const cartFunctions = require("../functions/cartFunctions");
let salesFunctions = require("../functions/salesFunctions");
let mailFunction = require("../functions/mailFunction");

const mainController ={
    index: function(req,res){
        let {username, id} = req.session.userlogged;
        let cartData = cartFunctions.processCartData(id,username);
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
        let data = cartFunctions.deleteCartData(req.params.id)
        if (!data.products){
            return res.redirect("/products/notFound")
        }else{
            res.render("confirmDelete", data);
        }
    },

    destroy: function(req,res){
        cartFunctions.deleteEntry(req.params.id);
		res.redirect("/cart")
    },
    
    payment: function(req,res){
        res.redirect("/users/profile");
    },

    processPayment:  function(req,res){
        let user = req.session.userlogged
        let purchase = salesFunctions.newSale(user.id);
        let siteMail = mailFunction.mail();
        if(purchase){
            let mailData = mailFunction.mailData(user,purchase);
            let text = mailData.headerMessage + mailData.detail;
            mailFunction.send(mailData.to, mailData.subject, text);
            mailFunction.send(siteMail, mailData.subject, text);
        }
        return res.redirect("/cart/payment")  
    },
    
}
module.exports = mainController
