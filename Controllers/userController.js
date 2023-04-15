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
// User -> for USER_LOGIN, EMPLOYEE, CUSTOMER tables

const { User } = require('../Models/user');

//TODO: add Customer and Employee methods to UserController
class UserController {
    // getting all users
    async getAllUsers() {
        // call the getAllUsers method of the User model
        return await User.getAllUsers();
    }

    // get user by type
    async getUserType(user) {
        try {
            return await User.getUserType(user);

        } catch (error) {
            // throw an error
            throw new Error(`User: ${user} does not exist.`);
        }
    }

    // getting a single user by id
    async getUserByEmail(email) {
        // get the user
        try {
            return await User.getUserByEmail(email);
        } catch (error) {
            throw new Error(`Email: ${email} does not exist.`);
        }

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

    // creating a customer
    async createCustomer(user) {
        try {
            let newuser = await User.createCustomer(user);
            return newuser;
        } catch (error) {
            // throw an error
            throw new Error(`Error creating customer, or user already created.`);
        }
    }

    // creating an employee
    async createEmployee(user) {
        try {
            let newuser = await User.createEmployee(user);
            return newuser;
        } catch (error) {
            // throw an error
            throw new Error(`Error creating employee, or user already created.`);
        }
    }

    async getUserShipmentsByEmail(email) {
        try {
            return await User.getUserShipmentsByEmail(email);
        } catch (error) {
            // throw an error
            throw new Error(`No shipments for ${email}`);
        }
    }

    async updateEmployee(email, key, new_value) {
        try {
            return await User.updateEmployee(email, key, new_value);
        } catch (error) {
            // throw an error
            throw new Error(`Failed to update or no employee with email: ${email}`);
        }
    }

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
