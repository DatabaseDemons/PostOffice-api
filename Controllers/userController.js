//controller.js

//TODO/FIXME: Each controller class will have its own JS file

// Logic behind functionalities
/*
this manages the actual functionality and
the logic behind each route used in this application.
It is made up of the Controller class,
which will have the following major HTTP methods:

getUsers()
getUser(email)
createUser(user)
updateUser(email)
deleteUser(email)

*/
const data = require("./data");
// User -> for USER_LOGIN, EMPLOYEE, CUSTOMER tables
const { User } = require('../Models/user');
const jwt = require('jsonwebtoken');

//TODO: add Customer and Employee methods to UserController
class UserController {
    // getting all users
    async getUsers() {
        // call the getAllUsers method of the User model
        const users = await User.getAllUsers();
        return users;

        // (DEPRECATED)
        // return new Promise((resolve, _) => resolve(data));
    }
//fixme
    // login the user and return a jwt
    // async loginUser(email, password) {
    //     console.log(email);
    //     //this is always return 1 user at the first index
    //     const recordset = await User.getUser(email);
    //     const user = recordset[0];


    //     if (user) {
    //       // Verify the password
    //         if (user.password !== password) {
    //             throw new Error('Invalid password.');
    //         }

    //         const token = jwt.sign({ email, type: user.type }, process.env.ACCESS_TOKEN_SECRET);
    //         return { token, userType: user.type };

    //     }
    //     else {
    //       throw new Error(`User with email ${email} not found.`);
    //     }
    //   }

    // getting a single user by id
    async getUser(email) {

        // get the user
        let user = await User.getUser(email);
        //console.log(user);

        if (user) {
            // return the user
            return user;
        } else {
            // throw an error
            throw new Error(`user with email: ${email} not found`);
        }

        /* (DEPRECATED)
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
        */

    }


//FIXME logic to actually do this in our db
    // creating a user
    async createUser(user) {

        let newuser = await User.createUser(user);
        return newuser;

        //(DEPRECATED)
        // return new Promise((resolve, _) => {
        //     // create a user, with random id and data sent
        //     let newuser = {
        //         id: Math.floor(4 + Math.random() * 10),
        //         ...user,
        //     };

        //     // return the new created user
        //     resolve(newuser);
        // });

    }
//FIXME: remove promise constructor
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

module.exports = UserController;
