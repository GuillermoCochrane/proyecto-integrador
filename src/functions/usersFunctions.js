const fs = require('fs');
const path = require('path');
const functions = require('./functions');

const usersFunctions ={

    pathDB: path.join(__dirname, '../data/usersDataBase.json'),

    allUsers: function()  {
        let users = [];
        let readUsers = fs.readFileSync(this.pathDB, 'utf-8');
        if (readUsers != ""){
            users = JSON.parse(readUsers);
        };
        return users;
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

    newUser: function(data){
        let newUser = {
			id: 			this.newId(),
			name: 			data.name,
			image: 			"default-image.png"
		};
        let users = this.allUsers();
        users.push(newUser);
        this.store(users);
        return newUser.id
    },

    editUser: function(id,data){
        let users = this.allUsers();
        for (const user of users) {
			if(user.id == id){
				user.name =          data.name
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