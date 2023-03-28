const { client } = require('./db');

class Shipment {
    //Retrieve all shipments
    static async getAllShipments() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.SHIPMENT;`);
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
                                                    WHERE S.creation_date='${date}';`);
            return result.recordset;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such shipment with creation date: ' + date);
        }
    }

    //Retrieve shipments associated with an email
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
}

module.exports = {
    Shipment,
}