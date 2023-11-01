const fs = require('fs');
const path = require('path');
const functions = require('./functions');

const usersFunctions ={

    pathDB: path.join(__dirname, '../data/usersDataBase.json'),

    pathProfile: path.join(__dirname,"../data/profileDataBase.json"),

    allUsers: function()  {
        let users = [];
        let readUsers = fs.readFileSync(this.pathDB, 'utf-8');
        if (readUsers != ""){
            users = JSON.parse(readUsers);
        };
        return users;
    },

    profiles: function()  {
        let profiles = [];
        let readProfiles = fs.readFileSync(this.pathProfile, 'utf-8');
        if (readProfiles != ""){
            profiles = JSON.parse(readProfiles);
        };
        return profiles;
    },

    filterByID : function(id){        
        let data = this.allUsers();
        return data.filter(user => user.id == id)
    },

    filterByKey: function(data,key){
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
        fs.writeFileSync( this.pathDB, JSON.stringify(data) );
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

    newUser: function(data, file){
        let categories = this.processCategories(data, file);
        let newUser = {
			id: 			this.newId(),
            name:           data.name,
			username: 		data.username,
            email: 			data.email,
            phone: 			parseInt(data.phone),
            address: 		data.address,
            borndate: 		data.borndate,
            photo: 			file.filename,
            categories: 	categories,
            profile: 		parseInt(data.profile),
            password:       data.password,
		};
        let users = this.allUsers();
        users.push(newUser);
        this.store(users);
        return newUser.id
    },

    editUser: function(id,data){
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
                user.photo =         user.photo;
                user.categories =    categories;
                user.profile =       parseInt(data.profile)
                user.password =      (data.password ? data.password : user.password);
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
    }
}

module.exports = usersFunctions