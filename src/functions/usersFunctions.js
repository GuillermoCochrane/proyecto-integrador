const fs = require('fs');
const path = require('path');
const functions = require('./functions');
const salesFunctions = require("./salesFunctions")
let bcrypt = require("bcryptjs");

const usersFunctions ={

    pathDB: path.join(__dirname, '../data/usersDataBase.json'),

    pathProfile: path.join(__dirname,"../data/profileDataBase.json"),

    title: " - MultiHogar",

    data: function(title){
        let data ={
            title: title + this.title,
            label: title
        };
        return data
    },

    allUsers: function()  {
        let users = [];
        let readUsers = fs.readFileSync(this.pathDB, 'utf-8');
        if (readUsers != ""){
            users = JSON.parse(readUsers);
        };
        return users;
    },

    search: function(searchkey){
        let users = this.allUsers();
        let results = users.filter ( user => (
            user.name.toUpperCase().includes(searchkey.toUpperCase()) || 
            user.username.toUpperCase().includes(searchkey.toUpperCase()) ||
            user.email.toUpperCase().includes(searchkey.toUpperCase()) 
            ));
        let label = "Resultados de la Búsqueda: " + results.length;
            return {
                results:    results,
                label:      label
            };
    },


    profiles: function()  {
        let profiles = [];
        let readProfiles = fs.readFileSync(this.pathProfile, 'utf-8');
        if (readProfiles != ""){
            profiles = JSON.parse(readProfiles);
        };
        return profiles;
    },

    addUsername: function(info){
        for (const entry of info) {
            let user = this.filterByID(entry.userID)[0];
            entry.username = user.username;
        };
        return info
    },

    filterByID : function(id){        
        let data = this.allUsers();
        return data.filter(user => user.id == id)
    },

    filterByKey: function(data,key){
        let alldata = this.allUsers();
        return alldata.filter(user => user[key].toUpperCase() == data.toUpperCase())
    },

    filterByKeyExact: function(data,key){
        let alldata = this.allUsers();
        return alldata.filter(user => user[key] == data)
    },

    newId: function(){
        let lastUser = this.allUsers().pop();
		if (lastUser){
            return lastUser.id + 1
        }
        return 1
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data, null, ' ') );
        return true
    },

    processCategories: function(data){
        let categories =[];
        if( typeof data.categories == "string" ){
            categories.push(parseInt(data.categories))
        }else if(typeof data.categories == "object"){
            for (const category of data.categories) {
                categories.push(parseInt(category))
            }
        };
        return categories
    },

    userProfileData: function(user){
        let data = {
            title: user.name,
            user: user,
            old: user,
            categories: functions.allCategories(),
            toThousand: functions.toThousand,
            purchases: salesFunctions.purchasesCounter(user.id)
        }
        return data
    },

    saleDetail: function(id){
        let saleData = salesFunctions.filterByID(id)[0];
        saleData.cartAmount = saleData.amount;
        saleData.title = `Detalle de compra: ${saleData.day}/${saleData.month}/${saleData.year}`;
        saleData.toThousand = functions.toThousand;
        return saleData
    },

    newUser: function(data){
        let newUser = {
			id: 			this.newId(),
			username: 		data.username,
            email: 			data.email,
            avatar: 			"default.png",
            categories: 	[],
            profile: 		1,
            password:       bcrypt.hashSync(data.password, 10),
		};
        let users = this.allUsers();
        users.push(newUser);
        this.store(users);
        return newUser.id
    },

    editUser: function(id,data, file){
        let categories = this.processCategories(data);
        let users = this.allUsers();
        for (const user of users) {
			if(user.id == id){
				user.name =          data.name;
                user.username =      data.username;
                user.email =         data.email;
                user.phone =         data.phone;
                user.address =       data.address;
                user.borndate =      data.borndate
                user.avatar =        file.filename;
                user.categories =    categories;
                user.password =      (data.password ? data.password : user.password);
            };
        };
        this.store(users);
        return id
    },

    changePassword: function(id, data){
        let users = this.allUsers();
        for (const user of users) {
			if(user.id == id){
                user.password =  bcrypt.hashSync(data.password, 10)
            };
        };
        this.store(users);
        return true
    },

    changeProfile: function(id){
        let users = this.allUsers();
        for (const user of users) {
			if(user.id == id){
                user.profile =  user.profile == 3 ?  1 :  3;
            };
        };
        this.store(users);
        return true
    },

    changeToken: function(email, token){
        let users = this.allUsers();
        for (const user of users) {
			if(user.email.toUpperCase() == email.toUpperCase()){
                user.token = token
            };
        };
        this.store(users);
        return users
    },

    changeAvatar: function( id, file ){
        let users = this.allUsers();
        for (const user of users) {
			if(user.id == id){
                    user.avatar = file.filename;
                };
        };
        this.store(users);
        return true
    },

    editUserData: function(id,data){
        let categories = this.processCategories(data);
        let users = this.allUsers();
        for (const user of users) {
			if(user.id == id){
				user.name =          data.name;
                user.username =      data.username;
                user.email =         data.email;
                user.phone =         data.phone;
                user.address =       data.address;
                user.categories =    categories;
            };
        };
        this.store(users);
        return id
    },

    deleteUser: function(id){
        let users = this.allUsers();
        let newUsers = users.filter((user)=> user.id != id);
		this.store(newUsers);
        return true
    },

    detailData: function(id){
        let user = usersFunctions.filterByID(id)[0];
        if (!user){
            return false
        } else {
            let data = {
                title: user.name,
                user: user,
                profiles: this.profiles(),
                categories: functions.allCategories()
            };
            return data
        }
    },

    deleteData: function(id){
        let user = usersFunctions.filterByID(id)[0];
        if(!user){
            return false
        }else{
            let product = {
                id: user.id,
                name: user.username,
            };
            let data = {
                products: product,
                title: "Eliminando - " + product.name,
                label: "Usuario",
                path: "users"
            }
            return data
        };
    },
}

module.exports = usersFunctions