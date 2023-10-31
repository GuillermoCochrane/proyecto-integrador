const fs = require('fs');
const path = require('path');

const functions ={

    pathStatusDB: path.join(__dirname, '../data/statusDataBase.json'),

    pathCategoriesDB: path.join(__dirname,"../data/categoryDataBase.json"),

    title: " - Mercado Liebre",

    toThousand: function(n){
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    allCategories: function()  {
    let category = [];
    let readCategory = fs.readFileSync(this.pathCategoriesDB, 'utf-8');
    if (readCategory != ""){
      category = JSON.parse(readCategory)
    };
    return category;
    },

    allStatus: function()  {
      let status = []
      let readStatus = fs.readFileSync(this.pathStatusDB, 'utf-8');
      if(readStatus != ""){
        status = JSON.parse(readStatus)
      }
		return status
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

    extValidator: function(file){
      let ext = path.extname(file.originalname);
      if (ext != ".jpg" && ext != ".png" && ext != ".bmp" && ext != ".gif" ){
        return true
      } else {
        return false
      }
    },
}

module.exports = functions