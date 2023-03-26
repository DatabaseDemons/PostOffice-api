const { client } = require('./db');

class POBox {
    //Retrieve all PO Boxes
    static async getAllPOBoxes() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.PO_BOX;`);
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve all PO boxes.');
        }
    }

    //Retrieve PO box by customer email
    static async getPOBoxByID(email) {
        try {
            const result = await client.query(`Select *
                                                FROM dev_db.postoffice.PO_BOX AS P
                                                WHERE P.customer_email='${email}';`);
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve or no such PO box with owner: ' + email);
        }
    }
}

module.exports = POBox;