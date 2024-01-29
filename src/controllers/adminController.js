let adminController = {
    index: function(req,res){
        return res.send("Bienvenido administrador")
    },
};

module.exports = adminController;