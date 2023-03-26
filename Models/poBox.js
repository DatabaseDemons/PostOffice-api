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

    //Retrieve PO boxes by owning branch
    static async getAllPOBoxesByBranch(addr) {
    try {
        const result = await client.query(`SELECT B.address AS Branch_address, P.box_num AS Box_number, P.customer_email AS Owner
                                            FROM dev_db.postoffice.PO_BOX AS P, dev_db.postoffice.BRANCH AS B
                                            WHERE P.branch_address='${addr}' AND B.address=P.branch_address;`);
        return result.recordset;
    } catch(err) {
        console.log(err);
        throw new Error('Failed to retrieve or no such PO box with owning branch: ' + addr);
    }
}

module.exports = POBox;