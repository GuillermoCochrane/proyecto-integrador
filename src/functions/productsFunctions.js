const fs = require('fs');
const path = require('path');

const productsFunctions ={

    pathDB: path.join(__dirname, '../data/productsDataBase.json'),

    allProducts: function()  {
		return JSON.parse(fs.readFileSync(this.pathDB, 'utf-8'));
    },

    filterByID : function(id){
        let data = this.allProducts();
        return data.filter(product => product.id == id)
    },
    filterByKey: function(data,key){
        let alldata = this.allProducts()
        return alldata.filter(product => product[key] == data)
    },

    newId: function(){
        let lastProduct = this.allProducts().pop();
		if (lastProduct){
            return lastProduct + 1
        }
        return 1
    }
}

module.exports = productsFunctions