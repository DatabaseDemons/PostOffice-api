const { client } = require('./db');

class Shipment {
    //Retrieve all shipments
    static async getAllShipments() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.SHIPMENT;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve all shipments.');
        }
    }

    //Retrieve shipment by ID
    static async getShipmentByID(id) {
        try {
            const result = await client.query(`Select *
                                                FROM dev_db.postoffice.SHIPMENT AS S
                                                WHERE S.tracking_id='${id}';`)
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipment with ID: ' + id);
        }
    }

    //Retrieve shipment by creation date
    //Remember that date is formatted as yyyy-mm-dd
    static async getShipmentByCreationDate(date) {
        try {
            const result = await client.query(`Select *
                                                    FROM dev_db.postoffice.SHIPMENT AS S
                                                    WHERE S.creation_date='${date}';`)
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipment with creation date: ' + date);
        }
    }
}

module.exports = {
    Shipment,
}