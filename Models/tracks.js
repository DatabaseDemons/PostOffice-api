const { client } = require('./db');

class Tracks {
    //Retrieve all tracks
    static async getAllTracks() {
        try {
            const result = await client.query(`Select * FROM dev_db.postoffice.TRACKS;`)
            return result.recordset;
        } catch(err) {
            console.log(err);
            throw new Error('Failed to retrieve all tracks.');
        }
    }

}

module.exports = {
    Tracks,
}