const productsFunctions = require("../../functions/productsFunctions")

const mainController ={

    search: function(req,res){
        let data = productsFunctions.search(req.query.search);
        let info = {
            meta: {
                status : 200,
                total: data.length,
                url: 'api/search'
            },
            data
        }
        return res.json(info)
    },

    up: function(req,res){
        return res.send("App is running")
    }

}
module.exports = mainController
