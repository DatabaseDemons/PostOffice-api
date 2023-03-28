//Tracks controller
const { Tracks } = require('../Models/tracks');

class TracksController {
    async getAllTracks() {
        return await Tracks.getAllTracks();
    }
}

module.exports = {
    TracksController,
}