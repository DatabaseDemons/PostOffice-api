const { client } = require('./db');

class Job {

    /**
     * Retrieve all job history entries
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
     * Retrieve a job entry by id
     * @returns The job with that id
     */
    static async getJobByID(id) {
        try {
            const result = await client.query(`
            Select *
            FROM dev_db.postoffice.JOB_HISTORY
            WHERE work_id='${id}';`);

            //console.log(result.recordset[0]);
            return result.recordset[0];
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve all jobs.');
        }
    }

    /**
     * Gets a self report of all jobs worked by an employee
     * @param {string} filter JSON of info needed to retrieve entries for an employee
     * @returns A report of all jobs performed by an employee
     */
    static async getSelfReport(filter) {
        try {
            console.log(filter)
            const newFilter = JSON.parse(filter);
            console.log(newFilter); // Fixme remove printout before prod

            const employee_email = newFilter.employee_email;
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
     * Create a new job entry in the database
     * @param {string} job String of json containing values for attributes to fill out a new job entry
     * @returns result of the sql query.
     */
    static async createJob(job) {
        try {
            const newJob = JSON.parse(job);

            const work_name = newJob.work_name;
            const employee_email = newJob.employee_email;
            const pay = newJob.pay;
            const hours_worked = newJob.hours_worked;
            const on_date = newJob.on_date;

            // Create shipment in database via sql
            await client.query(`INSERT INTO dev_db.postoffice.JOB_HISTORY
                                VALUES ('${work_name}', '${employee_email}', '${pay}', ${hours_worked}, '${on_date}');`);
            console.log(`Job for ${employee_email} created.`);

            return job;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to create job. Ensure data is complete with all attributes.');
        }
    }

    /**
     * Updates an attribute of a specific job.
     * @param {string} id ID of the job to update
     * @param {*} key Attribute to update
     * @param {*} new_value Value to update it to
     * @returns Results of the sql query
     */
    static async updateJob(id, key, new_value) {
        try {
            let result;

            //Need to format SQL differently if new value is a string
            if (typeof new_value === 'string') {
                result = await client.query(`
                        UPDATE dev_db.postoffice.JOB_HISTORY
                        SET ${key}='${new_value}'
                        WHERE work_id='${id}';`);
            } else {
                result = await client.query(`
                        UPDATE dev_db.postoffice.JOB_HISTORY
                        SET ${key}=${new_value}
                        WHERE work_id='${id}';`);
            }

            console.log(`Job id ${id} updated.`);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to update job history entry.');
        }
    }
}

module.exports = {
    Job,
}
