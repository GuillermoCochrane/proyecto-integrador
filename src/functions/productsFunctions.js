const fs = require('fs');
const path = require('path');

const productsFunctions ={

    pathDB: path.join(__dirname, '../data/productsDataBase.json'),

    title: " - Mercado Liebre",

    allProducts: function()  {
		return JSON.parse(fs.readFileSync(this.pathDB, 'utf-8'));
    },

    toThousand: function(n){
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    filterByID : function(id){
        let data = this.allProducts();
        return data.filter(product => product.id == id)
    },
    filterByKey: function(data,key){
        let alldata = this.allProducts()
        return alldata.filter(product => product[key] == data)
    }
}

module.exports = productsFunctions