//controller.js
// Logic behind functionalities
/*
this manages the actual functionality and 
the logic behind each route used in this application. 
It is made up of the Controller class, 
which will have the following major HTTP methods:

getUsers()
getUser(id)
createUser(user)
updateUser(id)
deleteUser(id)

*/
const data = require("./data");


class Controller {
    // getting all users
    async getUsers() {
        // return all users
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single user by id
    async getUser(id) {
        return new Promise((resolve, reject) => {
            // get the user
            let user = data.find((user) => user.id === parseInt(id));
            if (user) {
                // return the user
                resolve(user);
            } else {
                // return an error
                reject(`user with id ${id} not found `);
            }
        });
    }

    // creating a user
    async createUser(user) {
        return new Promise((resolve, _) => {
            // create a user, with random id and data sent
            let newuser = {
                id: Math.floor(4 + Math.random() * 10),
                ...user,
            };

            // return the new created user
            resolve(newuser);
        });
    }

    // updating a user
    async updateUser(id) {
        return new Promise((resolve, reject) => {
            // get the user.
            let user = data.find((user) => user.id === parseInt(id));
            // if no user, return an error
            if (!user) {
                reject(`No user with id ${id} found`);
            }
            //else, update it by setting completed to true
            user["completed"] = true;
            // return the updated user
            resolve(user);
        });
    }

    // deleting a user
    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            // get the user
            let user = data.find((user) => user.id === parseInt(id));
            // if no user, return an error
            if (!user) {
                reject(`No user with id ${id} found`);
            }
            // else, return a success message
            resolve(`user deleted successfully`);
        });
    }
}
module.exports = Controller;