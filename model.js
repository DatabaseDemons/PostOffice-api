//model.js

// Handles data logic
// Interacts with database

const { client } = require('./db');

class User {
    //Method to get all user logins in db
    static async getAllUsers() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.USER_LOGIN`)
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
                                            FROM dev_db.postoffice.USER_LOGIN ul
                                            WHERE ul.username = '${email}'`);
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve user logins.');
        }
    }


    //Method to get all customer data in db
    static async getAllCustomers() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.CUSTOMER`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve customers.');
        }
    }
    
    //Method to get all employee data in db
    static async getAllEmployees() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.EMPLOYEE`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve employees.');
        }
    }
}


module.exports = {
    User,
}