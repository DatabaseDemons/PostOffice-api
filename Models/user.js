// Handles data logic for user-related things
// Interacts with database

const { client } = require('./db');

class User {
    /**
     * Function to get all users in db and their basic info
     * @returns A list of all users
     */
    static async getAllUsers() {
        try {
            const result = await client.query(`(select first_name, last_name, email from postoffice.CUSTOMER c)
                                                union (select first_name, last_name, email from postoffice.EMPLOYEE e);`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve all users.');
        }
    }

    //Method to get all shipments by specific user
    static async getUserShipmentsByEmail(email) {
        try {

            const result = await client.query(`
                SELECT t.shipment_tracking_id, t.tracking_status, t.est_delivery_date, s.shipment_status, s.num_packages, s.mark_deletion
                FROM postoffice.TRACKS t
                INNER JOIN postoffice.SHIPMENT s
                ON t.shipment_tracking_id  = s.tracking_id
                WHERE t.customer_email = '${email}';
            `);

            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error(`Failed to get user shipments for ${email}.`);
        }
    }

    //Method to get user by type/role
    static async getUserType(user) {
        try {
            const email = user.email;
            const password = user.password;

            const result = await client.query(`
                SELECT ul.type
                FROM dev_db.postoffice.USER_LOGIN ul
                WHERE ul.username = '${email}' AND ul.password = '${password}';
            `)
            // always returns one item so first index
            return result.recordset[0];


        } catch (err) {
            console.log(err);
            throw new Error('User does not exist.');
        }
    }
    //Method to get user by email

    static async getUserByEmail(email) {
        try {
            const result = await client.query(`
                SELECT c.first_name, c.last_name, c.home_address, ul.username, ul.password, ul.type
                FROM postoffice.CUSTOMER c
                INNER JOIN postoffice.USER_LOGIN ul
                ON c.email = ul.username
                WHERE c.email = '${email}'
                AND ul.username ='${email}';
            `);

            return result.recordset[0];
        } catch (err) {
            throw new Error('Failed to retrieve user logins, check if email is correct.');
        }
    }

    /**
     * Function to get all customers in the DB.
     * @returns A list of all customers.
     */
    static async getAllCustomers() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.CUSTOMER;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve customers.');
        }
    }

    /**
     * Function to get all employees in the DB.
     * @returns A list of all employees.
     */
    static async getAllEmployees() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.EMPLOYEE;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve employees.');
        }
    }

    /**
     * Function to get all employees associated with a branch.
     * @param {string} address Address of the branch to return employees from.
     * @returns A list of employees on that branch.
     */
    static async getEmployeesByBranch(address) {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.EMPLOYEE AS E
                                                WHERE E.branch_address='${address}';`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve employees.');
        }
    }

    /**
     * Function to get all user logins present in the database.
     * @returns A list of all user logins.
     */
    static async getAllUserLogins() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.USER_LOGIN;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve user logins.');
        }
    }

    /**
     * Creates a new customer in the database.
     * @param {string} data JSON string of data to create a new customer.
     * @returns data parameter.
     */
    static async createCustomer(data) {
        try {

            const user = JSON.parse(data);
            console.log(user);

            //create user login for customer
            const username = user.email;
            const pw = user.password;
            const type = 'customer';
            let result = await client.query(`
                INSERT INTO dev_db.postoffice.USER_LOGIN (username, password, type)
                VALUES ('${username}', '${pw}', '${type}');
            `);
            console.log(`User Login created for ${username}.`);

            //add rest of data to customer table
            const fname = user.first_name;
            const lname = user.last_name;
            const addr = user.home_address;
            result = await client.query(`
                INSERT INTO dev_db.postoffice.CUSTOMER (email, home_address, first_name, last_name)
                VALUES ('${username}', '${addr}', '${fname}', '${lname}');
            `);
            console.log(`Customer ${fname} ${lname} created.`)

            //return post data
            return data;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to create new customer.');
        }
    }

    /**
     * Creates an employee in the database.
     * @param {string} data JSON data of the employee's info
     * @returns The result of the insert.
     */
    static async createEmployee(data) {
        try {

            const user = JSON.parse(data);

            //create user login for employee
            const username = user.email;
            const pw = user.password;
            const type = 'employee';
            let result = await client.query(`
                INSERT INTO dev_db.postoffice.USER_LOGIN (username, password, type)
                VALUES ('${username}', '${pw}', '${type}');
            `);
            console.log(`User Login created for ${username}.`);

            //add rest of data to customer table
            const fname = user.first_name;
            const lname = user.last_name;
            const addr = user.branch_address;
            const phone_num = user.phone_number;
            const start_date = user.start_date;
            result = await client.query(`
                INSERT INTO dev_db.postoffice.EMPLOYEE (email, branch_address, first_name, last_name, start_date, phone_number)
                VALUES ('${username}', '${addr}', '${fname}', '${lname}', '${start_date}', '${phone_num}');
            `);
            console.log(`Employee ${fname} ${lname} created.`)

            //return post data
            return data;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to create new employee.');
        }
    }

    /**
     * Updates an attribute of a specific employee.
     * @param {string} email Email of the employee to update
     * @param {*} key Attribute to update
     * @param {*} new_value Value to update it to
     * @returns Results of the sql query
     */
    static async updateEmployee(email, key, new_value) {
        try {

            let result;

            //Need to format SQL differently if new value is a string
            if (typeof new_value === 'string') {
                result = await client.query(`
                    UPDATE dev_db.postoffice.EMPLOYEE
                    SET ${key}='${new_value}'
                    WHERE email='${email}';`);
            } else {
                result = await client.query(`
                    UPDATE dev_db.postoffice.EMPLOYEE
                    SET ${key}=${new_value}
                    WHERE email='${email}';`);
            }

            console.log(`Employee ${email} updated.`);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update employee.');
        }
    }
}

module.exports = {
    User,
}