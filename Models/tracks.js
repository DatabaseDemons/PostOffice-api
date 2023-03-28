const { client } = require('./db');

class Tracks {
    /**
     * Function to retrieve all tracks in the DB.
     * @returns A list of all tracks in the DB.
     */
    static async getAllTracks() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.TRACKS;`)
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve all tracks.');
        }
    }

    //Create a new tracks in the database
    /**
     * Creates a new tracks tuple in the database. Ensure customer_email, employee_email,
     * shipment_tracking_id, curr_date, and tracking_status are present among the keys.
     * @param {string} data JSON string with data needed to create a new tracks tuple.
     * @returns data parameter.
     */
    static async createTracks(data) {
        try {
            const newTracks = JSON.parse(data);
            console.log(newTracks); // Fixme remove printout before prod

            //for the new tracks
            const custEmail = newTracks.customer_email;
            const empEmail = newTracks.employee_email;
            const id = newTracks.shipment_tracking_id;
            const date = newTracks.curr_date;
            const status = newTracks.tracking_status;

            // Create tracks in database via sql
            await client.query(`INSERT INTO dev_db.postoffice.TRACKS(shipment_tracking_id, curr_date, customer_email, employee_email, tracking_status)
                                VALUES ('${id}', '${date}', '${custEmail}', '${empEmail}', '${status}');`);
            console.log(`Tracks for package id ${id} created.`);

            return data;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to create tracks, ensure ID corresponds to shipment and emails belong to users.');
        }
    }

}

module.exports = {
    Tracks,
}