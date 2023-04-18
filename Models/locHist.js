const { client } = require('./db');

class LocHistory {

    /**
     * Retrieve all location history
     * @returns A list of all location history.
     */
    static async getAllLocHist() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.LOC_HISTORY;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve all location history.');
        }
    }
    
    static async getLocHistbyID(filter) {
        try {
            console.log(filter)
            const newFilter = JSON.parse(filter);
            console.log(newFilter); // Fixme remove printout before prod

            const id = newFilter.tracking_id;

            // Create shipment in database via sql
            const result = await client.query(`SELECT * 
                                               FROM postoffice.LOC_HISTORY L
                                               WHERE L.tracking_id='${id}';`
            );

            return result.recordset;

        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve location history.');
        }
    }
}

module.exports = {
    LocHistory,
}
