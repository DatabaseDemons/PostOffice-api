const { client } = require('./db');
const { Tracks } = require('./tracks');

//todo update shipment date
class Shipment {

    /**
     * Retrieve all shipments
     * @returns A list of all shipments.
     */
    static async getAllShipments() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.SHIPMENT;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve all shipments.');
        }
    }

    /**
     * Retrieve shipment by ID
     * @param {string} id ID of the shipment to search for.
     * @returns The results of the query searching for that ID.
     */
    static async getShipmentByID(id) {
        try {
            const result = await client.query(`Select *
                                                FROM dev_db.postoffice.SHIPMENT AS S
                                                WHERE S.tracking_id='${id}';`)
            
            //FIXME HERE DUDE

            return result.recordset[0]; //always returns one
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipment with ID: ' + id);
        }
    }

    /**
     * Retrieve shipment by creation date
     * @param {string} date Date to search by, formatted as yyyy-mm-dd
     * @returns The results of the sql query.
     */
    static async getShipmentByCreationDate(date) {
        try {
            const result = await client.query(`Select *
                                                    FROM dev_db.postoffice.SHIPMENT AS S
                                                    WHERE S.creation_date='${date}';`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipment with creation date: ' + date);
        }
    }

    /**
     * Retrieve shipments associated with an email
     * @param {string} email Email to find shipments for.
     * @returns The results of the sql query.
     */
    static async getShipmentsByEmail(email) {
        try {
            const result = await client.query(`Select customer_email, employee_email, S.tracking_id
                                                    FROM dev_db.postoffice.SHIPMENT AS S, dev_db.postoffice.TRACKS AS T
                                                    WHERE (T.customer_email='${email}' OR T.employee_email='${email}')
                                                    AND T.shipment_tracking_id=S.tracking_id;`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipments from email: ' + email);
        }
    }

    /**
     * Create a new shipment in the database
     * This also creates a tracks object using the info passed into
     * the 'shipment' parameter, which should contain the info for the
     * shipment (tracking_id, creation_date, current_location, shipment_status,
     * num_packages, region) as well as the info for the tracks (current date, emails, etc)
     *
     * @param {string} shipment String of json containing values for attributes to fill out both a new shipment
     * and a new tracks tuple.
     * @returns shipment parameter.
     */
    static async createShipment(shipment) {
        try {
            const newShip = JSON.parse(shipment);
            console.log(newShip); // Fixme remove printout before prod

            const id = newShip.tracking_id;
            const date = newShip.creation_date;
            const currLoc = newShip.current_location;
            const status = newShip.shipment_status;
            const num = newShip.num_packages;
            const region = newShip.region;

            // Create shipment in database via sql
            await client.query(`INSERT INTO dev_db.postoffice.SHIPMENT(tracking_id, creation_date, current_location, shipment_status, num_packages, region)
                                VALUES ('${id}', '${date}', '${currLoc}', '${status}', ${num}, '${region}');`);
            console.log(`Shipment id ${id} created.`);

            //create fitting tracks
            await Tracks.createTracks(shipment);

            return shipment;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to create shipment. Ensure shipment data is complete with all attributes and attributes for the tracks tuple.');
        }
    }
}

module.exports = {
    Shipment,
}