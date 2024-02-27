const fs = require('fs');
const path = require('path');

const functions ={

    pathStatusDB: path.join(__dirname, '../data/statusDataBase.json'),

    pathCategoriesDB: path.join(__dirname,"../data/categoryDataBase.json"),

    title: " - MultiHogar",

    toThousand: function(n){
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    dashboardCategoryStatus: function(){
      let data ={
        categories: this.allCategories(),
        statuses:   this.allStatus(),
        title: "Categorías / Estados",
        tab: 1,
        status: null,
        category: null,
      };
      return data
    },

    allCategories: function()  {
    let category = [];
    let readCategory = fs.readFileSync(this.pathCategoriesDB, 'utf-8');
    if (readCategory != ""){
      category = JSON.parse(readCategory);
    };
    return category;
    },

    allStatus: function()  {
      let status = [];
      let readStatus = fs.readFileSync(this.pathStatusDB, 'utf-8');
      if(readStatus != ""){
        status = JSON.parse(readStatus);
      }
		return status
    },

    newCategoryId: function(){
      let lastCategory = this.allCategories().pop();
      if (lastCategory){
          return lastCategory.id + 1
      }
      return 1
    },

    newStatusId: function(){
      let lastStatus = this.allStatus().pop();
      if (lastStatus){
          return lastStatus.id + 1
      }
      return 1
    },

    newCategory: function(data){
      let newCategory = {
        id: 			this.newCategoryId(),
        category: data.category
      };
      let categories = this.allCategories();
      categories.push(newCategory);
      this.storeCategory(categories);
      return true
    },

    newStatus: function(data){
      let newStatus = {
        id: 			this.newStatusId(),
        status:   data.newStatus
      };
      let status = this.allStatus();
      status.push(newStatus);
      this.storeStatus(status);
      return true
    },

    statusByID: function(id){
      let data = this.allStatus();
        return data.filter(status => status.id == id)[0]
    },

    categoryByID: function(id){
      let data = this.allCategories();
      return data.filter(category => category.id == id)[0]
    },

    storeStatus: function(data){
      fs.writeFileSync( this.pathStatusDB, JSON.stringify(data, null, ' ') );
      return true
    },

    storeCategory: function(data){
      fs.writeFileSync( this.pathCategoriesDB, JSON.stringify(data, null, ' ') );
      return true
    },

    editStatus: function(id,data){
      let allStatus = this.allStatus();
      for (const status of allStatus) {
        if(status.id == id){
          status.status =  data.status
        };
      }
      this.storeStatus(allStatus);
      return true;
    },

    editCategory: function(id,data){
      let allCategories = this.allCategories();
      for (const category of allCategories) {
        if(category.id == id){
          category.category =  data.category
        };
      }
      this.storeCategory(allCategories);
      return true;
    },

    productFormData: function(title, product){
      let data = {
        title: title + this.title,
        status: this.allStatus(),
        categories: this.allCategories(),
        product: product,
      };      
      return data
    },

    productData: function(title, products, label ){
      let data = {
        title: title + this.title,
        products: products,
        label: label,
        toThousand: this.toThousand,
      };
      return data
    },

    userFormData: function(title, user, profiles){
      let data = {
        title: title + this.title,
        categories: this.allCategories(),
        profiles: profiles,
        user: user,
        old: user
      };
      return data
    },

    extValidator: function(file){
      let ext = path.extname(file.originalname);
      if (ext != ".jpg" && ext != ".png" && ext != ".bmp" && ext != ".gif" ){
        return true
      } else {
        return false
      }
    },

    finalPrice: function(product){
      let discountedPrice = (product.price - ((product.price)*(product.discount/100)) );
      let price = Math.round(discountedPrice);
      return price
    },

    urlParam: function(token){
      let data = token.slice(-10); 
      let param = data;
      if(data.includes("/")){
        param = data.replaceAll(/\//g, 'X');
      }
      return param
    }
}

module.exports = functions