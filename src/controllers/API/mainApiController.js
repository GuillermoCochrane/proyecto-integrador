const productsFunctions = require("../../functions/productsFunctions")

const mainController ={

    search: function(req,res){
        let data = productsFunctions.searchData(req.query.search);
        return res.json(data)
    },

}
module.exports = mainController
