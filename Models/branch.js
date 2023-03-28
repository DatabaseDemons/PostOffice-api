const { client } = require('./db');

class Branch {

    /**
     * Retrieve all branches
     * @returns A list of all branches.
     */
    static async getAllBranches() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.BRANCH;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve all branches.');
        }
    }

    /**
     * Retrieve branch by address
     * @param {string} address Address to search for.
     * @returns The branch associated with that address.
     */
    static async getBranchByAddress(address) {
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

module.exports = {
    Branch,
}