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
            return lastProduct.id + 1
        }
        return 1
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data) )
        return true
    },

    newProduct: function(data){
        let newProduct = {
			id: 			this.newId(),
			name: 			data.name,
			price: 			parseInt(data.price),
			discount: 		parseInt(data.discount),
            status: 		parseInt(data.status),
			category: 		parseInt(data.category),
			description: 	data.description,
			image: 			"default-image.png"
		};
        let products = this.allProducts()
        products.push(newProduct);
        productsFunctions.store(products)
        return newProduct.id
    }
}

module.exports = productsFunctions