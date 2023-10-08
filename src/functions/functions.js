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
		return JSON.parse(fs.readFileSync(this.pathCategoriesDB, 'utf-8'));
    },

    allStatus: function()  {
		return JSON.parse(fs.readFileSync(this.pathStatusDB, 'utf-8'));
    },

}

module.exports = functions