//controller.js

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
        return await User.getAllUsers();
    }

    // getting a single user by id
    async getUserByEmail(email) {
        // get the user
        return await User.getUserByEmail(email);
    }

    // Get list of employees by branch address
    async getEmployeesByBranch(address) {
        return await User.getEmployeesByBranch(address);
    }

    // Get list of employees
    async getAllEmployees() {
        return await User.getAllEmployees();
    }

    // Get list of customers
    async getAllCustomers() {
        return await User.getAllCustomers();
    }

    //FIXME logic to actually do this in our db
    // creating a user
    async createUser(user) {

        let newuser = await User.createUser(user);
        return newuser;

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
