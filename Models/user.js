// Handles data logic for user-related things
// Interacts with database

const { client } = require('./db');

class User {
    //Method to get all user logins in db
    static async getAllUsers() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.USER_LOGIN;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve user logins.');
        }
    }

    //Method to get user by email
    static async getUser(email) {
        try {
            const result = await client.query(`Select *
                                            FROM dev_db.postoffice.USER_LOGIN AS ul
                                            WHERE ul.username = '${email}';`);
            return result.recordset;
        } catch(err) {
            throw new Error('Failed to retrieve user logins, check if email is correct.');
        }
    }

    //Method to get all customer data in db
    static async getAllCustomers() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.CUSTOMER;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve customers.');
        }
    }

    //Method to get all employee data in db
    static async getAllEmployees() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.EMPLOYEE;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve employees.');
        }
    }

    //Method to post a user's data into the db
    static async createUser(data) {
        try {
            return ':)'
        } catch(err) {
            console.log(err);
            throw new Error('Failed to create new user.');
        }
    }
}

module.exports = User;