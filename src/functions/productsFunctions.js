const fs = require('fs');
const path = require('path');
const functions = require('./functions');

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
        let alldata = this.allProducts();
        return alldata.filter(product => product[key] == data)
    },

    productsByCategory: function(id){
        let products = this.filterByKey(id,"category");
        let categories = functions.allCategories()
        let category = categories.filter(cat => cat.id == id)[0]
        return { products: products, category: category.category }
    },

    productsByStatus:function(id){
        let products = this.filterByKey(id,"status");
        let status = functions.allStatus()
        let selectedStatus = status.filter(cat => cat.id == id)[0]
        return { products: products, status: selectedStatus.status }
    },

    search: function(searchkey){
        let products = this.allProducts()
        let results = products.filter ( product => (
            product.name.toUpperCase().includes(searchkey.toUpperCase()) || 
            product.description.toUpperCase().includes(searchkey.toUpperCase())
            ));
        let label = "Resultados de la Búsqueda: " + results.length
            return {
                results:    results,
                label:      label
            }
    },

    newId: function(){
        let lastProduct = this.allProducts().pop();
		if (lastProduct){
            return lastProduct.id + 1
        }
        return 1
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data) );
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
        let products = this.allProducts();
        products.push(newProduct);
        this.store(products);
        return newProduct.id
    },

    editProduct: function(id,data){
        let products = this.allProducts();
        for (const product of products) {
			if(product.id == id){
				product.name =          data.name
				product.price =         data.price
				product.discount =      data.discount
				product.category =      data.category
				product.status =        data.status
                product.description =   data.description
            }
        }
        this.store(products)
        return id
    }
}

module.exports = productsFunctions