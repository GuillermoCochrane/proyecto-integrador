
const mainController ={
    index: function(req,res){
        res.send("esta en el carrito")
    },
    add: function(req,res){
        let user = req.session.userlogged
        console.log(user);
        res.send({
            data: req.body, 
            idProduct: req.params.id,
            user: user
        })
    }

}
module.exports = mainController
