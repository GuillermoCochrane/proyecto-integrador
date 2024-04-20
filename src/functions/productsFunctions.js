const fs = require('fs');
const path = require('path');
const functions = require('./functions');

const productsFunctions ={

    pathDB: path.join(__dirname, '../data/productsDataBase.json'),

    homeData: function(){
        let mostViewed = this.sortByViews();
        let data = {
            sectionTop: {
                data: this.arrayReducer(mostViewed,8),
                title: "Más Buscados"
            },
            sectionBottom: {
                data: productsFunctions.filterByKey(2,"status"),
                title: "Novedades"
            },
            title: "Bienvenido" + functions.title,
            toThousand: functions.toThousand,
        }
        return data
    },

    searchData: function(search){
        let searchResults = this.search(search);
        let label = "Resultados de la Búsqueda: " + searchResults.length;
        let data = {
            title: label + functions.title,
            label: label,
            products: searchResults,
            toThousand: functions.toThousand,
        }

        return data
    },

    allProducts: function()  {
        let products = [];
        let readProducts = fs.readFileSync(this.pathDB, 'utf-8');
        if (readProducts != ""){
            products = JSON.parse(readProducts);
        };
        return products;
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
        let lastcategory = functions.allCategories().pop();
        if (lastcategory.id < id){
            id = lastcategory.id
        };
        let categories = functions.allCategories();
        let products = this.filterByKey(id,"category");
        let category = categories.filter(cat => cat.id == id)[0];
        return { products: products, category: category.category }
    },

    productsByStatus:function(id){
        let lastStatus = functions.allStatus().pop();
        if(lastStatus.id < id){
            id = lastStatus.id
        };
        let products = this.filterByKey(id,"status");
        let status = functions.allStatus();
        let selectedStatus = status.filter(cat => cat.id == id)[0];
        return { products: products, status: selectedStatus.status }
    },

    search: function(searchkey){
        let products = this.allProducts();
        let results = products.filter ( product => (
            product.name.toUpperCase().includes(searchkey.toUpperCase()) || 
            product.description.toUpperCase().includes(searchkey.toUpperCase())
            ));
        
            return results;
    },

    newId: function(){
        let lastProduct = this.allProducts().pop();
		if (lastProduct){
            return lastProduct.id + 1
        }
        return 1
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data, null, ' ') );
        return true
    },

    newProduct: function(data,file){
        let newProduct = {
			id: 			this.newId(),
			name: 			data.name,
			price: 			parseInt(data.price),
			discount: 		parseInt(data.discount),
            status: 		parseInt(data.status),
			category: 		parseInt(data.category),
			description: 	data.description,
			image: 			file.filename,
            views:          0,
            sales:          0,
		};
        let products = this.allProducts();
        products.push(newProduct);
        this.store(products);
        return newProduct.id
    },

    editProduct: function(id,data, file){
        let products = this.allProducts();
        for (const product of products) {
			if(product.id == id){
				product.name =          data.name
				product.price =         data.price
				product.discount =      data.discount
				product.category =      data.category
				product.status =        data.status
                product.description =   data.description
                product.image =         file.filename
            };
        };
        this.store(products);
        return id
    },

    deleteProduct: function(id){
        let products = this.allProducts();
        let newProducts = products.filter((product)=> product.id != id);
		this.store(newProducts);
        return true
    },

    productViews: function(req){
        let id = req.params.id;
        let products = this.allProducts();
        for (const product of products) {
            if(product.id == id){
                product.views = product.views + 1;
            }}
            this.store(products);
            return true
    },

    productSales: function(id, quantity){
        let products = this.allProducts();
        for (const product of products) {
            if(product.id == id){
                if (!product.sales){
                    product.sales = 0;
                }
                product.sales = product.sales + quantity;
            }}
            this.store(products);
            return true
    },

    sortByViews: function(){
        let products = this.allProducts();
        return products.sort((a,b)=> b.views - a.views)
    },

    sortBySales: function(){
        let products = this.allProducts();
        return products.sort((a,b)=> b.sales - a.sales);
    },

    arrayReducer: function(array,n){
        let newArray = [];
        if(array.length < n){
            n = array.length;
        }
        for(i=0; i<n; i++){
            newArray.push(array[i]);
        };
        return newArray
    },

    preferences: function(preferences){
        let productsSelected = []
        for (const preference of preferences) {
            let selected = this.filterByKey(preference, "category")
            for (const product of selected) {
                productsSelected.push(product)
            }
        };
        return productsSelected
    },

    randomizer: function(data){
        return data.sort(()=> Math.random()-0.5)
    },

    recomended: function(data){
        let userPreferences = data.categories;
        let preferences = this.preferences(userPreferences);
        let random = this.randomizer(preferences);
        let reducedPreferences = this.arrayReducer(random,8);
        let title = "Productos recomendados para " + data.username;
        return {
            userPreferences: reducedPreferences,
            title: title
        }
    },

    detailData: function(id) {
        let product = this.filterByID(id)[0];
        if (!product){
            return false
        } else {
            product.finalPrice =  functions.finalPrice(product);
            let data = {
                title: product.name,
                product: product,
                toThousand: functions.toThousand
            };
            return data
        }
    },
}

module.exports = productsFunctions