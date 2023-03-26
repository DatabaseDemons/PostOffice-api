const { client } = require('./db');

class Branch {
    //Retrieve all branches
    static async getAllBranches() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.BRANCH;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve all branches.');
        }
    }

    //Retrieve branch by address
    static async getBranchByID(address) {
        try {
            const result = await client.query(`Select *
                                                FROM dev_db.postoffice.BRANCH AS B
                                                WHERE B.address='${address}';`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such branch with address: ' + address);
        }
    }
}

module.exports = Branch;