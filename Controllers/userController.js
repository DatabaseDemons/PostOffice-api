//controller.js

//TODO/FIXME: Each controller class will have its own JS file

// Logic behind functionalities
/*

this manages the actual functionality and
the logic behind each route used in this application.
It is made up of the Controller class,
which will have the following major HTTP methods:

getAllUsers()
getUserByEmail(email)
createUser(user)
updateUser(email)
deleteUser(email)

*/
const data = require("./data");
// User -> for USER_LOGIN, EMPLOYEE, CUSTOMER tables

const { User } = require('../Models/user');

//TODO: add Customer and Employee methods to UserController
class UserController {
    // getting all users
    async getAllUsers() {
        // call the getAllUsers method of the User model
        const users = await User.getAllUsers();
        return users;

        // (DEPRECATED)
        // return new Promise((resolve, _) => resolve(data));
    }

    // getting a single user by id
    async getUserByEmail(email) {

        // get the user
        let user = await User.getUserByEmail(email);
        //console.log(user);

        if (user) {
            // return the user
            return user;
        } else {
            // throw an error
            throw new Error(`user with email: ${email} not found`);
        }
    }


//FIXME logic to actually do this in our db
    // creating a user
    async createCustomer(user) {
        try{
            let newuser = await User.createCustomer(user);
            return newuser;
        } catch (error) {
            // throw an error
            throw new Error(`User: ${user} already created.`);
        }
        

    }


//FIXME: remove promise constructor
    // updating a user

    // async updateUser(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the user.
    //         let user = data.find((user) => user.id === parseInt(id));
    //         // if no user, return an error
    //         if (!user) {
    //             reject(`No user with id ${id} found`);
    //         }
    //         //else, update it by setting completed to true
    //         user["completed"] = true;
    //         // return the updated user
    //         resolve(user);
    //     });
    // }

//FIXME deleting a user (put/patch/update)
    // async deleteUser(id) {
    //     return new Promise((resolve, reject) => {
    //         // get the user
    //         let user = data.find((user) => user.id === parseInt(id));
    //         // if no user, return an error
    //         if (!user) {
    //             reject(`No user with id ${id} found`);
    //         }
    //         // else, return a success message
    //         resolve(`user deleted successfully`);
    //     });
    // }
}


module.exports = {
    UserController,
}
