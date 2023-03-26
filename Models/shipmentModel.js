//shipmentModel.js

// Handles data logic
// Interacts with database

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
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipment with ID: ' + id);
        }
    }
}

module.exports = {
    Shipment
};