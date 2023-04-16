const { client } = require('./db');

class Job {

    /**
     * Retrieve all job
     * @returns A list of all jobs.
     */
    static async getAllJobs() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.JOB_HISTORY;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve all jobs.');
        }
    }

    /**
     * Retrieve package by ID
     * @param {string} id ID of the shipment to search for.
     * @returns The results of the query searching for that ID.
     */
    static async getJobByEmail(id) {
        try {
            const result = await client.query(`Select *
                                                FROM dev_db.postoffice.JOB_HISTORY AS J
                                                WHERE J.package_id='${id}';`)
            
            //FIXME HERE DUDE
            return result.recordset[0]; //always returns one
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such package with ID: ' + id);
        }
    }
    
    static async getSelfReport(filter) {
        try {
            console.log(filter)
            const newFilter = JSON.parse(filter);
            console.log(newFilter); // Fixme remove printout before prod

            const employee_email= newFilter.employee_email;
            const start_date = newFilter.start_date;
            const end_date = newFilter.end_date;

            // Create shipment in database via sql
            const result = await client.query(`SELECT work_name, on_date, branch_address, pay, hours_worked
                                               FROM postoffice.JOB_HISTORY AS J, postoffice.EMPLOYEE AS E
                                WHERE E.email='${employee_email}' AND E.email=J.employee_email 
                                    AND on_date BETWEEN '${start_date}' AND '${end_date}';`);

            return result.recordset;

        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve self report.');
        }
    }

    /**
     * Create a new package in the database
     *
     * @param {string} job String of json containing values for attributes to fill out both a new shipment
     * and a new tracks tuple.
     * @returns package parameter.
     */
    static async createJob(job) {
        try {
            const newJob = JSON.parse(job);
            console.log(newJob); // Fixme remove printout before prod

            const work_name = newJob.work_name;
            const employee_email= newJob.employee_email;
            const pay = newJob.pay;
            const hours_worked = newJob.hours_worked;
            const on_date = newJob.on_date;

            // Create shipment in database via sql
            await client.query(`INSERT INTO dev_db.postoffice.PACKAGE(tracking_id, weight, is_fragile, size_package, shipment_tracking_id)
                                VALUES ('${work_name}', '${employee_email}', '${pay}', ${hours_worked}, '${on_date}');`);
            console.log(`Package id ${employee_email} created.`);

            return job;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to create package. Ensure package data is complete with all attributes and attributes for the tracks tuple.');
        }
    }
}

module.exports = {
    Job,
}