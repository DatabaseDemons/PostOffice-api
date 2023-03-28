const { client } = require('./db');

class Tracks {
    //Retrieve all tracks
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
            throw new Error('Failed to create shipment, ensure ID corresponds to shipment and emails belong to users.');
        }
    }

}

module.exports = {
    Tracks,
}